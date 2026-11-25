export type Stage = {
  number: string
  title: string
  eyebrow: string
  question: string
  outcome: string
  deliverable: string
}

export const stages: Stage[] = [
  { number: '01', title: 'Purpose & AGENTS.md', eyebrow: '先锁定目标', question: '页面为谁服务、要让他理解什么，并最终做出哪个动作？', outcome: '让 Codex 从“主题猜测”转向明确用户旅程；把上下文沉淀到 AGENTS.md。', deliverable: 'Outcome, CTA, project instructions' },
  { number: '02', title: 'Design skill', eyebrow: '建立审美护栏', question: '如何避免“看起来不错，但像所有 AI 网站”的默认视觉语言？', outcome: '用可复用的设计技能提高一般性判断，再用项目规则收紧边界。', deliverable: 'Reusable design guidance' },
  { number: '03', title: 'Browser verification', eyebrow: '看见真实页面', question: '运行成功之后，视觉、响应式与体验是否真的成立？', outcome: '让代理在浏览器中验证可见结果，而不是只相信代码与终端输出。', deliverable: 'Visual + responsive review' },
  { number: '04', title: 'Brand design.md', eyebrow: '定义品牌系统', question: '如何让这一个品牌拥有自己的色彩、间距与细节，而不是套用模型偏好？', outcome: '使用项目级 design.md 固定视觉系统，同时保留已经有效的结构与动效。', deliverable: 'Brand visual system' },
  { number: '05', title: 'Original assets', eyebrow: '生成归属感', question: '如何让图像不再只是填空的图库，而是与品牌和内容属于同一个系统？', outcome: '先规划，再生成与内容相关的原始资产，并以明确目录管理。', deliverable: 'Asset plan + governed assets/' },
  { number: '06', title: 'Layout inspiration', eyebrow: '借鉴而不复制', question: '如何用视觉参考改进构图，却不借走别人的品牌和内容？', outcome: '把截图/参考作为构图输入，保持自身品牌、信息结构和文案。', deliverable: 'Reference rationale + revision' },
  { number: '07', title: 'Components & performance', eyebrow: '精修并减负', question: '哪些局部组件值得替换，怎样在保留表达力时处理加载与动效成本？', outcome: '局部引入、逐项验证；以性能和无障碍约束完成最终质量收口。', deliverable: 'Component change + performance evidence' },
]

export const tensions = [
  { conflict: '快速单次提示 × 可复现项目事实', keep: '保留先用清晰目标启动的速度', update: '把事实、命令和验收标准补入 PROJECT.md / SPEC', decision: '更新' },
  { conflict: '外部设计技能 × 仓库级治理', keep: '保留技能带来的审美增益', update: '对技能、资产来源和许可做项目内记录与审核', decision: '双轨保留' },
  { conflict: '浏览器自主检查 × 可重复的 CI 证据', keep: '保留视觉与断点检查', update: '将 lint、测试、构建纳入 harness.config.json 与 CI', decision: '更新' },
  { conflict: '重动效表达 × 性能/无障碍', keep: '保留有目的的运动与视觉张力', update: '尊重 reduced-motion，限制成本，并做实际构建验证', decision: '更新' },
  { conflict: '快速发布 × 发布门禁与恢复', keep: '保留将站点上线的低摩擦路径', update: '增加候选构建、预演、恢复入口和负责人记录', decision: '更新' },
]

export const operatingLayers = [
  { number: '01', title: '站点契约', summary: '把受众、可观察结果、编辑语气、视觉系统与明确边界放在可读的项目资料中。', asset: 'design.md + SITE_PROFILE.example.yml' },
  { number: '02', title: '内容与资产生命周期', summary: '让每个条目经历 intake → plan → draft → validate → review → release → observe / quarantine，而不是从提示词直接跳到发布。', asset: 'CONTENT_ASSET_RECORD.example.md' },
  { number: '03', title: '质量门', summary: '把结构、可访问性、响应式、性能、来源/权利、链接与交互检查拆成可重跑的门，而不是一次主观验收。', asset: 'CHECKLIST.md + automated checks' },
  { number: '04', title: '证据与恢复', summary: '候选版本必须能指出基线、构建产物、预演证据、发布决定与恢复入口；截图不能替代完整证据链。', asset: 'release record + candidate evidence' },
  { number: '05', title: '共享与本地边界', summary: '共享能力通过工具、模板和版本化文档复用；站点只保留自己的内容、设计与部署编排，避免复制运行逻辑或隐私配置。', asset: 'tools/ + operations docs' },
]

export const referenceHygiene = [
  '先提取原则、状态机与验收条件；不复制具体站点内容或运行记录。',
  '域名、地址、邮箱、账号、令牌、密钥、绝对路径与生产 ID 一律替换成类型占位符。',
  '把真实数据改写成边界、输入、输出与失败条件；保留可验证性，不保留可识别性。',
  '共享脚本/工具只通过明确版本与入口复用；不要拷贝运行时、凭据或环境绑定。',
]

export const gscEvidenceLoop = [
  { number: '01', title: '脱敏输入', detail: '只保留聚合趋势、置信度与匿名证据；原始查询、页面地址、导出文件和凭据停留在仓库外。' },
  { number: '02', title: '双窗口对照', detail: '明确基线与比较窗口，分别记录可见性、点击与收录覆盖信号，避免用单一指标下结论。' },
  { number: '03', title: '候选而非自动化', detail: '把发现写成可回退的假设和候选动作；每个动作都需要负责人审批，不能直接改站或发布。' },
  { number: '04', title: '发布后回测', detail: '沿用同一组聚合信号进行观察；只有有证据的改善才保留，负面或不确定结果进入回退或复盘。' },
]

export const checklistItems = [
  '写清受众、产品价值和唯一的主要 CTA',
  '将稳定项目上下文写入 AGENTS.md',
  '加载并审查适用的设计技能与品牌 design.md',
  '用浏览器检查视觉、移动端和关键交互',
  '让原创资产与内容、品牌和目录规范相匹配',
  '记录布局参考，避免复制其品牌与内容',
  '验证组件、动效、性能、无障碍与交付检查',
]

export const promptTemplate = `Build one focused website experience.\n\nAudience: [who + context]\nPurpose: [what they must understand]\nPrimary CTA: [one measurable action]\nVisual system: [brand design.md + references]\nAssets: [original asset plan and allowed directory]\nMust keep: [existing constraints]\nVerify: [browser, responsive, lint, test, build]\n\nFirst return: a concise plan, assumptions, source/permission concerns, and tensions needing a decision. Then implement one reversible vertical slice and show the evidence.`
