#!/usr/bin/env python3
"""Run declared project checks with Python 3.9+ and no extra packages."""

import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
STAGES = ("setup", "lint", "test", "build")
CORE_FILES = ("AGENTS.md", "docs/harness/PROJECT.md", "docs/harness/SPEC.md", "docs/harness/RELEASE.md")

def load_config():
    with (ROOT / "harness.config.json").open(encoding="utf-8-sig") as source:
        config = json.load(source)
    if not isinstance(config, dict) or set(config) != {"schema_version", *STAGES} or config["schema_version"] != 1:
        raise ValueError("invalid harness.config.json schema")
    for stage_name in STAGES:
        stage = config[stage_name]
        if isinstance(stage, dict) and stage_name in ("lint", "build") and set(stage) == {"skip_reason"} and isinstance(stage["skip_reason"], str) and stage["skip_reason"].strip():
            continue
        if not isinstance(stage, list) or any(not isinstance(argv, list) or not argv or not all(isinstance(arg, str) and "\x00" not in arg for arg in argv) for argv in stage):
            raise ValueError(f"invalid {stage_name} command list")
    return config

def doctor(config):
    missing = [path for path in CORE_FILES if not (ROOT / path).is_file() or not (ROOT / path).stat().st_size]
    if missing:
        raise ValueError("missing or empty: " + ", ".join(missing))
    print("Harness layout and configuration are valid.")
    return 0

def check(config):
    for stage_name in STAGES:
        stage = config[stage_name]
        if isinstance(stage, dict):
            print(f"[{stage_name}] skipped: {stage['skip_reason']}")
            continue
        for index, argv in enumerate(stage, start=1):
            program = argv[0]
            if program == "@python":
                program = sys.executable
            elif os.name == "nt" and os.path.basename(program) == program:
                program = shutil.which(program) or program
            print(f"[{stage_name} {index}/{len(stage)}] {' '.join(argv)}", flush=True)
            try:
                result = subprocess.run([program, *argv[1:]], cwd=ROOT, check=False)
            except FileNotFoundError:
                print(f"[{stage_name}] program not found: {argv[0]}", file=sys.stderr)
                return 127
            if result.returncode:
                print(f"[{stage_name}] exit code {result.returncode}; stopping.", file=sys.stderr)
                return result.returncode
    print("All declared project checks passed.")
    return 0

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("doctor", "check"))
    action = parser.parse_args().action
    try:
        config = load_config()
        return doctor(config) if action == "doctor" else check(config)
    except (OSError, ValueError) as error:
        print(f"Harness: {error}", file=sys.stderr)
        return 2

if __name__ == "__main__":
    sys.exit(main())
