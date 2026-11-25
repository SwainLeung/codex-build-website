import { useEffect, useMemo, useState } from 'react'
import { checklistItems, promptTemplate, stages, tensions } from './content'

const storageKey = 'codex-website-system-checklist'

function App() {
  const [activeStage, setActiveStage] = useState(0)
  const [checked, setChecked] = useState<boolean[]>(() => {
    if (typeof window === 'undefined') return checklistItems.map(() => false)
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return checklistItems.map(() => false)
    try {
      const parsed: unknown = JSON.parse(saved)
      return Array.isArray(parsed) && parsed.length === checklistItems.length && parsed.every((item) => typeof item === 'boolean')
        ? parsed
        : checklistItems.map(() => false)
    } catch {
      window.localStorage.removeItem(storageKey)
      return checklistItems.map(() => false)
    }
  })
  const [copyState, setCopyState] = useState('复制可改写的提示词')

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked))
  }, [checked])

  const progress = useMemo(() => Math.round((checked.filter(Boolean).length / checklistItems.length) * 100), [checked])
  const stage = stages[activeStage]

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptTemplate)
      setCopyState('已复制 — 去替换方括号中的内容')
    } catch {
      setCopyState('复制失败，请从下方文本手动复制')
    }
  }

  const toggleCheck = (index: number) => {
    setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))
  }

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="AI LABS 网站构建系统首页">AI <span>LABS</span></a>
        <nav aria-label="页面导航">
          <a href="#stages">七阶段</a>
          <a href="#tensions">冲突对照</a>
          <a href="#launch">启动清单</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">THE ANTI-VIBECODED PLAYBOOK / 2026</p>
          <h1>让网站看起来<br /><em>属于一个真实品牌。</em></h1>
          <p className="lede">把视频中的七阶段工作法，转成可交付、可审查、可复现的 AI 原生网站系统。</p>
          <div className="hero-actions">
            <a className="button primary" href="#stages">进入七阶段 <span aria-hidden="true">↓</span></a>
            <a className="button quiet" href="#tensions">查看系统冲突</a>
          </div>
          <div className="source-note"><span className="pulse" />基于本地 vidIQ 字幕提炼；内容为原创工作流摘要</div>
        </div>
        <div className="hero-orbit" aria-label="七阶段构建环">
          <div className="orbit orbit-outer" />
          <div className="orbit orbit-inner" />
          <div className="orbital-copy"><strong>07</strong><span>stages<br />one system</span></div>
          <span className="star star-one">✦</span><span className="star star-two">✦</span><span className="star star-three">✦</span>
        </div>
      </section>

      <section className="intro shell">
        <p className="section-label">THE IDEA</p>
        <div>
          <h2>漂亮不是终点。<br />可验证的品牌表达才是。</h2>
          <p>模型能很快产出页面，但“默认设计”“无关的图库素材”“只在 localhost 看起来没问题”会让结果失去归属感。七阶段解决的是这些断点；harness 则把每个断点变成仓库里可追溯的事实。</p>
        </div>
      </section>

      <section className="stages shell" id="stages">
        <div className="section-heading"><p className="section-label">THE SEVEN STAGES</p><p>点击阶段，展开它要解决的真实问题。</p></div>
        <div className="stage-layout">
          <div className="stage-list" role="tablist" aria-label="七个构建阶段">
            {stages.map((item, index) => (
              <button key={item.number} className={index === activeStage ? 'stage-button active' : 'stage-button'} onClick={() => setActiveStage(index)} role="tab" aria-selected={index === activeStage}>
                <span>{item.number}</span><strong>{item.title}</strong><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <article className="stage-detail" role="tabpanel">
            <p className="eyebrow">{stage.eyebrow} / {stage.number}</p>
            <h3>{stage.title}</h3>
            <blockquote>“{stage.question}”</blockquote>
            <p>{stage.outcome}</p>
            <div className="deliverable"><span>留下的项目资产</span><code>{stage.deliverable}</code></div>
            <div className="stage-count">{String(activeStage + 1).padStart(2, '0')} <small>/ 07</small></div>
          </article>
        </div>
      </section>

      <section className="tensions" id="tensions">
        <div className="shell">
          <div className="section-heading inverse"><p className="section-label">WHERE SYSTEMS CLASH</p><p>不隐藏冲突：保留值得保留的速度，更新无法证明的部分。</p></div>
          <div className="tension-table" role="table" aria-label="视频工作法与 AI Native Harness 的冲突分析">
            <div className="tension-row tension-head" role="row"><span>冲突</span><span>保留</span><span>用 harness 补足</span><span>决定</span></div>
            {tensions.map((item) => <div className="tension-row" role="row" key={item.conflict}><strong>{item.conflict}</strong><span>{item.keep}</span><span>{item.update}</span><em>{item.decision}</em></div>)}
          </div>
        </div>
      </section>

      <section className="launch shell" id="launch">
        <div className="prompt-card">
          <p className="section-label">START WITH A BETTER BRIEF</p>
          <h2>把创作方向<br />变成系统输入。</h2>
          <pre>{promptTemplate}</pre>
          <button className="button primary" onClick={copyPrompt}>{copyState} <span aria-hidden="true">↗</span></button>
        </div>
        <div className="checklist-card">
          <div className="checklist-top"><div><p className="section-label">LAUNCH CHECKLIST</p><h2>不要只问“好看吗？”</h2></div><strong>{progress}<small>%</small></strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <div className="checklist-items">
            {checklistItems.map((item, index) => <label key={item}><input type="checkbox" checked={checked[index]} onChange={() => toggleCheck(index)} /><span className="fake-check" aria-hidden="true">✓</span><span>{item}</span></label>)}
          </div>
          <p className="checklist-foot">进度保存在此浏览器。完整可审计清单见 <code>docs/CHECKLIST.md</code>。</p>
        </div>
      </section>

      <footer className="shell"><a className="brand" href="#top">AI <span>LABS</span></a><p>Built as an AI-native harness example — evidence over vibes.</p><a href="https://youtu.be/pHstb0JGGhE" target="_blank" rel="noreferrer">源视频 ↗</a></footer>
    </main>
  )
}

export default App
