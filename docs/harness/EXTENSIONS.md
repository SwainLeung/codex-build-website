# 按项目需要启用扩展

一个新项目可以先用根目录的 `AGENTS.md`、一份有验收条件的需求、一条真实测试命令和一次 PR 评审完成第一轮交付。下一轮只引入能解决已记录问题的扩展。下文的 Codex 路径面向本地客户端；托管环境的可用性以该环境提供的设置和工具清单为准。

## 选择正确的入口

| 附件中的机制 | Codex 或 GitHub 项目入口 | 接手已有仓库时怎样验证 |
|---|---|---|
| 记忆层 · 项目指令 | 根 `AGENTS.md`。本地 Codex 启动时按项目根至当前目录收集指令；同目录 `AGENTS.override.md` 优先，更接近工作目录的指令可覆盖上层。 | 在实际工作的目录开启新会话，要求复述项目目标、测试入口和发布负责人，并指出来源。若仓库已有指令，把本包内容合并到对应范围。 |
| 扩展层 · 技能 | 本包提供 `.agents/skills/feature-delivery/SKILL.md`。Codex 读取名称和描述以选择技能，也可显式指定 `$feature-delivery`。 | 给出一个已采纳 Issue，要求按技能列出验收条件、拟改文件及验证命令。检查所列命令是否来自目标仓库。 |
| 扩展层 · 子智能体 | 支持的本地版本可按任务委派，或在 `.codex/agents/*.toml` 定义项目角色。角色说明用来分工；沙箱和审批权限由父会话设置。 | 将“定位现有调用方”和“检查测试缺口”分给两个只读任务，分别交回文件位置、证据和未决项。主会话核实后统一修改。 |
| 扩展层 · 工具事件钩子 | 支持此功能的本地 Codex 在受信任项目中可从 `.codex/hooks.json` 加载注册项。按客户端文档选择事件，例如 `PostToolUse`。 | 给测试分支配置一个仅计数的处理器；一次匹配工具调用应产生一条记录。删除本次注册项并重开会话后再调用，应无新增记录。 |
| 扩展层 · Git 提交钩子 | Git 默认从其 hooks 目录加载可执行的 `pre-commit`，也可通过 `core.hooksPath` 选择目录。本包由目标项目决定是否接入。 | 先运行 `git config --show-origin --get core.hooksPath`，无输出时查看 Git 默认目录。复用项目现有管理器，在测试分支用一个可撤销的格式错误验证拦截，修复后应可提交。 |
| 集成层 · MCP | Codex 在受信任项目可读 `.codex/config.toml` 的 `[mcp_servers.<name>]`，个人配置可放在 `~/.codex/config.toml`。 | 先绑定演示仓库的只读 Issue 服务，核对实际工具清单和目标资源；查询已知 Issue 并比对编号、标题。禁用该连接后，切换到人工提供的 Issue 链接或摘录。 |
| 集成层 · CI 与部署 | 本包的 `.github/workflows/harness-ci.yml` 用 `harness-verify` 执行业务检查。目标平台的部署和回退接入项目既有流水线。 | 以候选提交运行，一次故意失败、一次修复成功，记录同一 PR 两次检查的提交 SHA。将项目要求的业务检查设为合并条件。 |
| 编程层 · 规范驱动开发 | `docs/harness/SPEC.md` 定义行为、边界和验收条件；实现与测试使用原有项目目录。 | 在 PR 为每个验收条件附上测试结果或人工复核记录，并记录没有覆盖到的场景。 |

已有的 `.ai/` 可保留为团队资料目录。从 `AGENTS.md` 显式引用资料，并将需要自动发现或执行的入口注册到对应工具中。Git 的 `pre-commit` 可被跳过，也不会因为 PR 创建而自动运行；需要强制的检查应在 CI 独立复验。一次 `doctor` 结构自检不能证明应用可发布。

### 同时使用 Claude Code

先在实际会话检查已加载的项目指令。部分 Claude Code 版本和配置会直接读取根 `AGENTS.md`；若项目原有 `CLAUDE.md` 或客户端未加载共用指令，可在根 `CLAUDE.md` 中加入单独一行 `@AGENTS.md`。Claude 专用要求追加到该文件，共用要求继续在 `AGENTS.md` 维护。

Claude Code 的项目技能入口是 `.claude/skills/`，自定义子智能体位于 `.claude/agents/`，项目钩子在 `.claude/settings.json` 注册，项目 MCP 连接使用根目录的 `.mcp.json`。如果同时使用两种客户端，可让各入口指向同一份流程文档；分别用相同 Issue 试跑并核对验收清单。已有自动化先检查是否重复注册。

## 何时继续投入

| 阶段 | 启用条件与做法 | 验收、退出与保留的交付路径 |
|---|---|---|
| 一 · 单项目本地开发 | 稳定重复的功能开发流程先采用随包技能。小任务由一个会话完成；需要并行调查时再拆分角色。 | 用一次真实变更证明需求能追溯到测试和 PR。技能路由不可用时，明确要求读取对应 `SKILL.md`。子智能体不可用时，在一个会话中顺序执行“调查 → 实现 → 对照验收”。 |
| 二 · PR 自动检查 | 本地命令已能识别坏改动时，接入 `Harness CI` 或已有 CI；在 `harness.config.json` 登记项目真实命令。 | 日志应显示失败步骤，修复后获得新的成功记录。钩子拖慢开发或误报时，移除本次本地注册，继续运行相同的 CI 检查。 |
| 三 · 无交互评审与发布交接 | PR 较多时，先让 `codex exec --sandbox read-only` 在受控环境审阅已脱敏的 diff，只输出带文件位置、理由和置信度的建议。构建、迁移、部署沿用审查过的项目脚本。 | 对一组已人工评审的 PR 比较新增有效发现、误报和每次成本。超出项目约定的预算或输出失真时，停用 AI 评审作业，照常运行 CI 与人工评审。上线决策和结果记在该版本的发布记录。 |
| 四 · 跨项目工具治理 | 当人工查找外部上下文持续耗时时，给一个 MCP 服务指定负责人、数据范围、允许的工具和超时，先在一个项目试用。若需新增写入能力，独立评估该具体动作。 | 用授权资源测试读取，用测试身份验证范围限制。工具或权限超出约定、错误频发、达到成本上限时，停用服务、撤销授权并回到人工取证。保留一次试验的耗时和费用，作为下一项目是否采用的依据。 |

### 无交互评审的接线约定

1. 由可信的工作流生成用于评审的差异和验收摘要，将它们作为数据交给独立的只读评审任务。在干净工作目录启动工具，凭据仅供该任务使用。将外部 PR 作者提供的内容视为待评审输入。
2. 评审任务先输出报告，由维护者判断是否采纳。若确需自动评论，再单独配置仅负责发布评论的身份和步骤。对 fork PR，普通检查使用 `pull_request`；具有仓库写权限或密钥的任务应避免执行贡献者分支上的代码、钩子或项目配置。
3. 发布脚本只晋级已验证的提交或不可变制品，按 `docs/harness/RELEASE.md` 记录观察和回退。使用 GitHub Environment 的项目先核对仓库可见性、套餐和已启用的保护规则；也可由既有部署平台承接审批。
4. 为试用指定复盘日期及预算单位，例如每个 PR 的模型费用、每周总额、最长运行分钟数和最高并发数。由调用方或平台执行上限；达到上限时保留人工路径。密钥由平台秘密存储或环境变量注入；服务端身份和资源授权决定可访问哪些数据。

## 官方参考

- Codex 项目指令、技能和子智能体。[AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Skills](https://learn.chatgpt.com/docs/build-skills) · [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- Codex 工具事件、MCP 配置和非交互运行。[Hooks](https://learn.chatgpt.com/docs/hooks) · [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli) · [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- Claude Code 项目配置。[项目指令](https://code.claude.com/docs/en/memory) · [Skills](https://code.claude.com/docs/en/skills) · [子智能体](https://code.claude.com/docs/en/sub-agents) · [Hooks](https://code.claude.com/docs/en/hooks) · [MCP](https://code.claude.com/docs/en/mcp)
- Git 与 GitHub 的强制检查和部署控制。[Git hooks](https://git-scm.com/docs/githooks.html) · [分支保护](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) · [PR 触发器](https://docs.github.com/en/actions/reference/security/securely-using-pull_request_target) · [部署审批](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/review-deployments)

## v1.1 运行边界与 CI 失败交接

| 场景 | 启用与验证 | 出现异常时的动作 |
| --- | --- | --- |
| 本地规则 | 在目标模块目录核对实际加载的 AGENTS.md。相同目录的 AGENTS.override.md 优先；测试目录的文件只在相应范围生效。普通 Markdown 放进 .codex/rules/ 时，应显式引用其内容。 | 查启动目录与覆盖文件，并用同一个验收用例复核。 |
| 客户端配置 | 可参考包内 adapters/codex/config.toml.example，在受信任项目的 .codex/config.toml 按需合并。用当前客户端核对实际沙箱、审批与网络策略。 | 若组织策略或客户端不支持某项，保留宿主设置并在项目卡注明实际限制。 |
| 工具钩子 | 先选一个事件和可重复的触发动作。在临时分支各跑一次匹配与不匹配操作；登记处理器返回码、超时与日志。 | 修复误触发或暂时撤销注册。CI 另行执行关键校验；Stop 钩子应有终止条件。 |
| CI 失败诊断 | 保存失败 SHA、作业、退出码与脱敏日志。在隔离工作树重跑原命令，优先修复第一个可复现的问题。需要模型协助时先给只读日志与差异。 | 交付最小修复差异和同一反例的复测结果。需要发布 PR 的环境另设明确的写操作与身份。 |
| 只读评审成本 | 项目明确评审触发条件、最长时间、预算、输出位置和负责人。用一份历史 PR 对比人工发现与误报。 | 达到上限时结束模型作业，保留正常业务 CI 的结果与人工跟进。 |

配置示例采用 approval_policy 和 sandbox_mode；旧提案中的 approval-mode、auto-edit、full-auto 不作为模板配置值。无交互模型评审提供建议，业务验证由脚本退出码与测试断言判定。认证由使用环境按官方说明配置。

官方参考：[项目指令](https://developers.openai.com/codex/guides/agents-md/) · [配置键](https://developers.openai.com/codex/config-reference/) · [非交互运行](https://developers.openai.com/codex/noninteractive/)
