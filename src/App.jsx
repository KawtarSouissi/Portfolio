import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'

const BASE_URL = import.meta.env.BASE_URL
const asset = (path) => `${BASE_URL}${path.replace(/^\/+/, '')}`

const AboutScene = lazy(() => import('./AboutScene'))
const SimsAboutScene = lazy(() => import('./SimsAboutScene'))
const EducationTeaScene = lazy(() => import('./EducationTeaScene'))

const makeProjectMedia = (slug, imageCount, videoCount) => ({
  images: Array.from({ length: imageCount }, (_, index) => ({
    src: asset(`/projects/${slug}/gallery-${index + 1}.png`),
    label: `Photo ${String(index + 1).padStart(2, '0')}`,
  })),
  videos: Array.from({ length: videoCount }, (_, index) => ({
    src: asset(`/projects/${slug}/reel-${index + 1}.mp4`),
    label: `Reel ${String(index + 1).padStart(2, '0')}`,
  })),
})

const projectFiles = [
  {
    id: 'ks-modesty',
    name: 'KS MODESTY',
    folder: 'KS_MODESTY',
    color: '#9f1734',
    accent: '#f1b6c5',
    role: 'Projet de marque',
    summary: 'Direction créative, contenu et identité digitale.',
    period: 'Projet personnel · Mode',
    mission: 'Créer un univers cohérent autour de la modest fashion et produire des contenus capables de présenter les collections avec une identité forte.',
    services: ['Direction créative', 'Création de contenu', 'Social media', 'Campagnes vidéo'],
    logo: asset('/projects/KSMODESTY/KS_logo.png'),
    social: {
      instagram: 'https://www.instagram.com/ksmodesty/',
      tiktok: 'https://www.tiktok.com/@ksmodesty',
      handle: '@ksmodesty',
    },
    folders: ['Contenu promotionnel', 'Contenu Trendy', 'Teaser', 'Vlog'],
    ...makeProjectMedia('ks-modesty', 15, 4),
  },
  {
    id: 'naklo-b3da',
    name: 'NAKLO B3DA',
    folder: 'NAKLO_B3DA',
    color: '#315c4c',
    accent: '#cbd9b6',
    role: 'Création de contenu',
    summary: 'Production visuelle et contenus food actuels.',
    period: 'Création de contenu · Food',
    mission: 'Découvrir des adresses, raconter une expérience culinaire et transformer chaque dégustation en contenu court, spontané et engageant.',
    services: ['Concept éditorial', 'Tournage', 'Montage Reels', 'Présentation caméra'],
    logo: asset('/projects/naklo-b3da/NAKBLO_LOGO.png'),
    social: {
      instagram: 'https://www.instagram.com/naklob3da/',
      tiktok: 'https://www.tiktok.com/@naklob3da',
      handle: '@naklob3da',
    },
    folders: ['Découvertes', 'Dégustation face cam', 'Contenu trendy'],
    ...makeProjectMedia('naklo-b3da', 10, 8),
  },
  {
    id: 'riwaya',
    name: 'RIWAYA',
    folder: 'RIWAYA',
    color: '#5d397f',
    accent: '#d2bde4',
    role: 'Production événementielle',
    summary: 'Captation, storytelling et contenus événementiels.',
    period: 'Production · Événementiel',
    mission: 'Mettre en valeur les décors, les créations et les moments forts à travers une narration visuelle élégante pensée pour les réseaux sociaux.',
    services: ['Captation événementielle', 'Storytelling', 'Montage', 'Community management'],
    logo: asset('/projects/RIWAYA/riwaya_logo.png'),
    social: {
      instagram: 'https://www.instagram.com/riwaya_prod/',
      tiktok: 'https://www.tiktok.com/@riwaya_prod',
      handle: '@riwaya_prod',
    },
    folders: ['Event recap', 'Backstage', 'Storytelling'],
    ...makeProjectMedia('RIWAYA', 13, 7),
  },
]

const pdfAssets = {
  cv: asset('/projects/Green Aesthetic Creative Cv Resume (1).pdf'),
  letter: asset('/projects/Lettre de motivation Kawtar Souissi.pdf'),
}

const staticAssetsToPreload = [
  asset('/hero.png'),
  asset('/3D_glb_optimized/kaw.png'),
  asset('/macbook-projects-wallpaper.png'),
  asset('/3D_glb_optimized/tea.glb'),
  asset('/3D_glb_optimized/bas_bouche.png'),
  asset('/3D_glb_optimized/haut_bouche.png'),
  asset('/3D_glb_optimized/ticket.png'),
  pdfAssets.cv,
  pdfAssets.letter,
]

function ProjectDesktop() {
  const [openFolders, setOpenFolders] = useState([])
  const [openCases, setOpenCases] = useState([])
  const [infoSlides, setInfoSlides] = useState({})
  const [manualPlayback, setManualPlayback] = useState({})
  const [videoPlaybackState, setVideoPlaybackState] = useState({})
  const [videoVolumes, setVideoVolumes] = useState({})
  const [windowPositions, setWindowPositions] = useState({})
  const dragState = useRef(null)
  const projectVideoRefs = useRef({})
  const [cvOpen, setCvOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [socialWindows] = useState([])

  useEffect(() => {
    if (!openFolders.length) return undefined
    const timer = window.setInterval(() => {
      setInfoSlides((current) => {
        const next = { ...current }
        openFolders.forEach((id) => {
          if (manualPlayback[id]) return
          const item = projectFiles.find((project) => project.id === id)
          if (item) next[id] = ((current[id] ?? 0) + 1) % item.videos.length
        })
        return next
      })
    }, 4200)

    return () => window.clearInterval(timer)
  }, [manualPlayback, openFolders])

  const openProject = (id) => {
    setOpenFolders((current) => [...current.filter((item) => item !== id), id])
  }

  const openProjectCase = (id) => {
    setOpenCases((current) => [...current.filter((item) => item !== id), id])
    setInfoSlides((current) => ({ ...current, [id]: current[id] ?? 0 }))
    setManualPlayback((current) => ({ ...current, [id]: current[id] ?? false }))
    setVideoPlaybackState((current) => ({ ...current, [id]: current[id] ?? true }))
    setVideoVolumes((current) => ({ ...current, [id]: current[id] ?? 1 }))
    setWindowPositions((current) => ({
      ...current,
      [id]: current[id] ?? {
        x: (projectFiles.findIndex((item) => item.id === id) - 1) * 46,
        y: projectFiles.findIndex((item) => item.id === id) * 28,
      },
    }))
  }

  const closeFolder = (id) => {
    setOpenFolders((current) => current.filter((item) => item !== id))
  }

  const closeCase = (id) => {
    setOpenCases((current) => current.filter((item) => item !== id))
  }

  const openSocialWindow = (projectId, platform) => {
    const project = projectFiles.find((item) => item.id === projectId)
    const url = project?.social?.[platform]
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const closeSocialWindow = () => {}

  const moveInfoSlide = (id, direction) => {
    const project = projectFiles.find((item) => item.id === id)
    if (!project) return
    setManualPlayback((current) => ({ ...current, [id]: false }))
    setVideoPlaybackState((current) => ({ ...current, [id]: true }))
    setInfoSlides((current) => ({
      ...current,
      [id]: ((current[id] ?? 0) + direction + project.videos.length) % project.videos.length,
    }))
  }

  const selectProjectVideo = (id, index) => {
    setInfoSlides((current) => ({ ...current, [id]: index }))
    setManualPlayback((current) => ({ ...current, [id]: true }))
    setVideoPlaybackState((current) => ({ ...current, [id]: true }))
  }

  const toggleMainVideoPlayback = (id) => {
    const video = projectVideoRefs.current[id]
    if (!video) return
    if (video.paused) {
      void video.play()
      setVideoPlaybackState((current) => ({ ...current, [id]: true }))
    } else {
      video.pause()
      setVideoPlaybackState((current) => ({ ...current, [id]: false }))
    }
  }

  const changeVideoVolume = (id, value) => {
    const volume = Number(value)
    const video = projectVideoRefs.current[id]
    if (video) {
      video.volume = volume
      video.muted = volume === 0
    }
    setVideoVolumes((current) => ({ ...current, [id]: volume }))
  }

  const focusProject = (id) => {
    setOpenCases((current) => [...current.filter((item) => item !== id), id])
  }

  useEffect(() => {
    const moveWindow = (event) => {
      if (!dragState.current) return
      const { id, startX, startY, originX, originY } = dragState.current
      setWindowPositions((current) => ({
        ...current,
        [id]: {
          x: originX + event.clientX - startX,
          y: originY + event.clientY - startY,
        },
      }))
    }
    const stopMoving = () => {
      dragState.current = null
    }
    window.addEventListener('pointermove', moveWindow)
    window.addEventListener('pointerup', stopMoving)
    return () => {
      window.removeEventListener('pointermove', moveWindow)
      window.removeEventListener('pointerup', stopMoving)
    }
  }, [])

  const startMoving = (event, id) => {
    if (event.target.closest('button')) return
    focusProject(id)
    const position = windowPositions[id] ?? { x: 0, y: 0 }
    dragState.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    }
  }

  return (
    <section className="projects-section" id="projects" aria-label="Projets et expériences">
      <div className="projects-wallpaper" aria-hidden="true">
        <img src={asset("/macbook-projects-wallpaper.png")} alt="" loading="lazy" decoding="async" />
      </div>

      <header className="projects-menu">
        <div className="mac-menu-left">
          <strong aria-label="Apple">●</strong>
          <b>Finder</b>
          <span>Fichier</span>
          <span>Édition</span>
          <span>Présentation</span>
          <span>Aller</span>
          <span>Fenêtre</span>
          <span>Aide</span>
        </div>
        <div className="mac-menu-right">
          <span>⌁</span>
          <span>⌕</span>
          <span>▰</span>
          <time>Ven. 12 juin&nbsp;&nbsp;20:19</time>
        </div>
      </header>

      <div className="desktop-title">
        <strong>PROJECTS &amp; EXPERIENCE</strong>
        <em>Kawtar&apos;s desktop</em>
      </div>

      <div className="desktop-folders">
        {projectFiles.map((item, index) => (
          <button
            className={`desktop-folder folder-${index + 1}${openFolders.includes(item.id) ? ' is-selected' : ''}`}
            type="button"
            key={item.id}
            onDoubleClick={() => openProject(item.id)}
            onClick={() => openProject(item.id)}
            style={{ '--folder-color': item.color, '--folder-accent': item.accent }}
          >
            <span className="folder-icon" aria-hidden="true">
              <img src={item.logo} alt="" />
              <b className="folder-notification">{index === 0 ? 4 : index === 1 ? 8 : 3}</b>
            </span>
            <span>{item.folder}</span>
          </button>
        ))}
      </div>

      <aside className="desktop-sticky-note" aria-label="Note de Kawtar">
        <header>
          <span>Notes</span>
          <time>20:19</time>
        </header>
        <strong>À ne pas oublier ✦</strong>
        <p>Créer avec intention,<br />raconter avec émotion<br />et toujours oser.</p>
        <small>— Kawtar</small>
      </aside>

      <button className="desktop-cv-file" type="button" onClick={() => setCvOpen(true)}>
        <span className="cv-paper" aria-hidden="true">
          <i>PDF</i>
          <b>KS</b>
          <em />
          <em />
          <em />
        </span>
        <span>KAWTAR_CV.pdf</span>
      </button>

      <button className="desktop-letter-file" type="button" onClick={() => setLetterOpen(true)}>
        <span className="cv-paper letter-paper" aria-hidden="true">
          <i>PDF</i>
          <b>LM</b>
          <em />
          <em />
          <em />
        </span>
        <span>LETTRE_MOTIVATION.pdf</span>
      </button>

      {cvOpen ? (
        <div className="cv-window">
          <div className="window-bar">
            <div className="window-controls">
              <button type="button" onClick={() => setCvOpen(false)} aria-label="Fermer le CV" />
              <i />
              <i />
            </div>
            <span>KAWTAR_CV.pdf — Aperçu</span>
          </div>
          <article className="cv-preview">
            <object
              data={pdfAssets.cv}
              type="application/pdf"
              aria-label="CV de Kawtar"
            >
              <a href={pdfAssets.cv} target="_blank" rel="noreferrer">
                Ouvrir le CV de Kawtar
              </a>
            </object>
          </article>
        </div>
      ) : null}

      {letterOpen ? (
        <div className="cv-window letter-window">
          <div className="window-bar">
            <div className="window-controls">
              <button type="button" onClick={() => setLetterOpen(false)} aria-label="Fermer la lettre de motivation" />
              <i />
              <i />
            </div>
            <span>Lettre de motivation Kawtar Souissi.pdf — Aperçu</span>
          </div>
          <article className="cv-preview">
            <object
              data={pdfAssets.letter}
              type="application/pdf"
              aria-label="Lettre de motivation de Kawtar"
            >
              <a href={pdfAssets.letter} target="_blank" rel="noreferrer">
                Ouvrir la lettre de motivation de Kawtar
              </a>
            </object>
          </article>
        </div>
      ) : null}

      {openFolders.map((projectId, windowIndex) => {
        const project = projectFiles.find((item) => item.id === projectId)
        if (!project) return null

        return (
          <div
            className="project-window"
            key={`folder-${project.id}`}
            style={{
              left: `calc(50% + ${(windowIndex - 1) * 56}px)`,
              top: `${17 + windowIndex * 3}%`,
              zIndex: 20 + windowIndex,
            }}
          >
            <div className="window-bar">
              <div className="window-controls">
                <button type="button" onClick={() => closeFolder(project.id)} aria-label="Fermer le dossier" />
                <i />
                <i />
              </div>
              <span>{project.folder}</span>
            </div>
            <div className="window-toolbar">
              <button type="button" onClick={() => closeFolder(project.id)} aria-label="Retour">‹</button>
              <strong>{project.name}</strong>
              <small>{project.folders.length + 1} éléments</small>
            </div>
            <div className="folder-content">
              <aside className="folder-sidebar">
                <div>
                  <strong>Projet</strong>
                  <p>{project.role}</p>
                </div>
                <div>
                  <strong>Contenu</strong>
                  <p>{project.summary}</p>
                </div>
              </aside>
              <div className="project-files">
                <button
                  type="button"
                  className="exe-file project-exe-entry"
                  onClick={() => openProjectCase(project.id)}
                  style={{ '--project-color': project.color }}
                >
                  <span>
                    <img src={project.logo} alt="" />
                  </span>
                  <svg className="exe-arrow exe-arrow-top" viewBox="0 0 120 70" aria-hidden="true">
                    <path d="M8 14 C38 8, 72 10, 98 28" />
                    <path d="M87 20 C96 24, 102 28, 108 36" />
                    <path d="M90 32 C98 31, 105 33, 113 39" />
                  </svg>
                  <svg className="exe-arrow exe-arrow-left" viewBox="0 0 120 70" aria-hidden="true">
                    <path d="M104 14 C72 18, 42 26, 18 42" />
                    <path d="M29 32 C23 38, 18 44, 11 50" />
                    <path d="M29 52 C21 49, 14 48, 6 47" />
                  </svg>
                  <svg className="exe-arrow exe-arrow-right" viewBox="0 0 120 70" aria-hidden="true">
                    <path d="M14 16 C44 18, 76 24, 103 43" />
                    <path d="M92 34 C99 39, 105 44, 112 52" />
                    <path d="M89 54 C98 51, 105 51, 114 52" />
                  </svg>
                  <em>open me</em>
                  <small>{project.folder}.exe</small>
                </button>

                {project.folders.map((folderName) => (
                  <button
                    type="button"
                    className="media-file project-subfolder"
                    key={`${project.id}-${folderName}`}
                    style={{ '--project-color': project.color, '--project-accent': project.accent }}
                  >
                    <span className="folder-preview" aria-hidden="true">
                      <i />
                    </span>
                    <small>{folderName}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {openCases.map((projectId, windowIndex) => {
        const project = projectFiles.find((item) => item.id === projectId)
        if (!project) return null
        const infoSlide = infoSlides[projectId] ?? 0
        const currentSlide = project.videos[infoSlide]
        const isManualMode = manualPlayback[projectId] ?? false
        const isPlaying = videoPlaybackState[projectId] ?? true
        const volume = videoVolumes[projectId] ?? 1
        const position = windowPositions[projectId] ?? { x: 0, y: 0 }

        return (
        <div
          className="info-window case-study-window"
          key={project.id}
          onPointerDown={() => focusProject(project.id)}
          style={{
            '--project-color': project.color,
            '--window-x': `${position.x}px`,
            '--window-y': `${position.y}px`,
            zIndex: 30 + windowIndex,
          }}
        >
          <div className="window-bar" onPointerDown={(event) => startMoving(event, project.id)}>
            <div className="window-controls">
              <button type="button" onClick={() => closeCase(project.id)} aria-label="Fermer le projet" />
              <i />
              <i />
            </div>
            <span>{project.folder}.EXE — Information about: {project.name}</span>
          </div>
          {project.id === 'naklo-b3da' ? (
            <div className="naklo-case-decoration" aria-hidden="true">
              <img className="naklo-case-logo" src="/projects/naklo-b3da/NAKBLO_LOGO.png" alt="" />
              <img className="naklo-case-phone" src="/projects/naklo-b3da/nakblo_phone.png" alt="" />
            </div>
          ) : null}
          {project.id === 'ks-modesty' ? (
            <div className="ks-case-decoration" aria-hidden="true">
              <img src="/projects/KSMODESTY/KS_logo.png" alt="" />
            </div>
          ) : null}
          {project.id === 'riwaya' ? (
            <div className="riwaya-case-decoration" aria-hidden="true">
              <img src="/projects/RIWAYA/riwaya_logo.png" alt="" />
            </div>
          ) : null}
          <div className="info-content">
            <div className="info-copy">
              {project.id === 'naklo-b3da' ? (
                <>
                  <img className="naklo-info-logo" src={asset("/projects/naklo-b3da/NAKBLO_LOGO.png")} alt="Naklo B3da w i7en Lah" />
                  <section className="naklo-info-text">
                    <h4>ORIGINE <em>de notre nom</em></h4>
                    <p>J’ai décidé de nommer mon compte “Naklo B3da W I7en Lah”, une expression tirée tout droit du dialecte marocain. Elle signifie “Mangeons d’abord, Dieu s’occupera du reste”. C’est une expression célèbre dans la culture marocaine. Elle permet de recentrer le sujet sur le plus important : la simplicité de partager un moment de convivialité autour d’un bon plat, et de laisser le reste aux mains de Dieu.</p>
                  </section>
                  <section className="naklo-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>Étant franco-marocaine et grande adepte de tout ce qui est relié de près ou de loin à la nourriture, je me devais de créer un concept qui permettrait à ma communauté de découvrir de nouvelles spécialités culinaires et activités existantes en France et au Maroc. Objectif ? Partager un univers qui me passionne, promouvoir l’inclusivité et l’accessibilité à travers la découverte de lieux qui ont pour cibles tout type de profil client. Ma sœur m’a rejointe dans ce magnifique projet : bienvenue dans notre univers.</p>
                  </section>
                </>
              ) : project.id === 'ks-modesty' ? (
                <>
                  <img className="ks-info-logo" src={asset("/projects/KSMODESTY/KS_logo.png")} alt="KS Modesty" />
                  <section className="ks-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>J’ai développé un projet qui me ressemble et qui répondait à un réel besoin sur le marché. KS Modesty est une marque spécialisée dans les voiles d’exception, et se distingue par une approche novatrice. Le message que je souhaite transmettre est qu’une femme qui fait le choix vestimentaire du voile ne doit pas se perdre dans les attentes de la société ni se vêtir de manière monotone et sans extravagance. Bref, j’en ai dit assez.</p>
                  </section>
                </>
              ) : project.id === 'riwaya' ? (
                <>
                  <img className="riwaya-info-logo" src={asset("/projects/RIWAYA/riwaya_logo.png")} alt="Riwāya" />
                  <section className="riwaya-info-text">
                    <h4>ORIGINE <em>de notre nom</em></h4>
                    <p>Riwaya signifie « histoire » ou « récit » en arabe. Un nom qui reflète parfaitement ma vision de la création de contenu événementiel : chaque événement raconte une histoire unique. Derrière chaque regard, chaque détail, il y a un récit qui mérite d’être capturé et transmis.</p>
                  </section>
                  <section className="riwaya-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>J’ai lancé ce compte de création de contenu événementiel parce qu’il réunit tout ce qui me passionne : l’esthétique, le sens du détail, la création de contenu et surtout l’émotion humaine. J’aime capturer ces instants qui ne se reproduiront jamais deux fois, mettre en lumière la beauté d’un moment, d’un lieu ou d’une histoire à travers mon regard. Chaque événement est une occasion de raconter quelque chose d’unique, de transformer des souvenirs en images et de faire ressentir aux autres une atmosphère bien précise.</p>
                  </section>
                </>
              ) : (
                <>
              <div className="case-study-index">PROJECT FILE / 0{projectFiles.findIndex((item) => item.id === project.id) + 1}</div>
              <h3>{project.name}</h3>
              <p className="case-study-period">{project.period}</p>
              <p className="case-study-mission">{project.mission}</p>
              <dl>
                <dt>Rôle</dt>
                <dd>{project.role}</dd>
                <dt>Médias</dt>
                <dd>{project.videos.length} vidéos · {project.images.length} images</dd>
              </dl>
              <div className="case-study-services">
                {project.services.map((service) => <span key={service}>{service}</span>)}
              </div>
                </>
              )}
              <div className="project-image-grid" aria-label={`Galerie photo ${project.name}`}>
                {project.images.map((image) => (
                  <figure key={image.src}>
                    <img src={image.src} alt={`${project.name} — ${image.label}`} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
              <div className="project-socials" aria-label={`Réseaux sociaux ${project.name}`}>
                <button
                  type="button"
                  className="project-social project-social-instagram"
                  onClick={() => openSocialWindow(project.id, 'instagram')}
                  aria-label={`Ouvrir la fenêtre Instagram de ${project.name}`}
                >
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" role="img" focusable="false">
                      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" ry="5.25" fill="none" stroke="currentColor" strokeWidth="1.9" />
                      <circle cx="12" cy="12" r="4.15" fill="none" stroke="currentColor" strokeWidth="1.9" />
                      <circle cx="17.45" cy="6.55" r="1.2" fill="currentColor" />
                    </svg>
                  </span>
                  <b>Instagram</b>
                </button>
                <button
                  type="button"
                  className="project-social project-social-tiktok"
                  onClick={() => openSocialWindow(project.id, 'tiktok')}
                  aria-label={`Ouvrir la fenêtre TikTok de ${project.name}`}
                >
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" role="img" focusable="false">
                      <path fill="currentColor" d="M14.72 3c.36 1.97 1.56 3.54 3.82 4.03v2.63a7.18 7.18 0 0 1-3.7-1.09l-.02 6.18a5.58 5.58 0 1 1-5.57-5.57c.34 0 .64.03.93.09v2.77a2.85 2.85 0 1 0 1.92 2.71V3h2.62Z" />
                    </svg>
                  </span>
                  <b>TikTok</b>
                </button>
              </div>
            </div>
            <div className="info-carousel">
              <div className="info-carousel-stage media-type-video">
                {currentSlide ? (
                  <span
                    className="carousel-media-backdrop"
                    style={{ backgroundImage: `url("${project.images[0]?.src}")` }}
                    aria-hidden="true"
                  />
                ) : null}
                <span className="carousel-project-mark">{project.name}</span>
                <video
                  key={currentSlide?.src}
                  ref={(node) => {
                    if (node) projectVideoRefs.current[project.id] = node
                  }}
                  src={currentSlide?.src}
                  autoPlay
                  loop={!isManualMode}
                  muted={!isManualMode || volume === 0}
                  controls={false}
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) => {
                    event.currentTarget.volume = volume
                    if (isManualMode) {
                      void event.currentTarget.play()
                    }
                  }}
                  onPlay={() => setVideoPlaybackState((current) => ({ ...current, [project.id]: true }))}
                  onPause={() => setVideoPlaybackState((current) => ({ ...current, [project.id]: false }))}
                  onEnded={() => {
                    setManualPlayback((current) => ({ ...current, [project.id]: false }))
                    setVideoPlaybackState((current) => ({ ...current, [project.id]: true }))
                    setInfoSlides((current) => ({
                      ...current,
                      [project.id]: ((current[project.id] ?? 0) + 1) % project.videos.length,
                    }))
                  }}
                />
                <button
                  type="button"
                  className={`carousel-stage-toggle${isManualMode ? ' is-manual' : ''}`}
                  onClick={() => isManualMode && toggleMainVideoPlayback(project.id)}
                  aria-label={isManualMode ? (isPlaying ? 'Mettre en pause la vidéo' : 'Lire la vidéo') : 'Carrousel automatique en cours'}
                >
                  {isManualMode ? <span>{isPlaying ? 'pause' : 'play'}</span> : null}
                </button>
                {isManualMode ? (
                  <div className="carousel-volume" aria-label="Réglage du volume">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(event) => changeVideoVolume(project.id, event.target.value)}
                      aria-label="Volume de la vidéo"
                    />
                  </div>
                ) : null}
                <button type="button" className="carousel-arrow carousel-prev" onClick={() => moveInfoSlide(project.id, -1)} aria-label="Média précédent">‹</button>
                <button type="button" className="carousel-arrow carousel-next" onClick={() => moveInfoSlide(project.id, 1)} aria-label="Média suivant">›</button>
              </div>
              <div className="carousel-caption">
                <span>Selected work · {project.name}</span>
                <small>{String(infoSlide + 1).padStart(2, '0')} / {String(project.videos.length).padStart(2, '0')}</small>
              </div>
              <div className="carousel-video-strip" aria-label={`Choisir une vidéo pour ${project.name}`}>
                {project.videos.map((media, index) => (
                  <button
                    type="button"
                    key={media.src}
                    className={`carousel-video-thumb${infoSlide === index ? ' is-active' : ''}`}
                    onClick={() => selectProjectVideo(project.id, index)}
                    aria-label={`Lire ${media.label} avec le son`}
                  >
                    <video
                      src={media.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                    />
                    <span>{media.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        )
      })}

      <div className="desktop-hint">Clique sur un dossier pour l’ouvrir</div>

      {socialWindows.map((socialWindow, index) => {
        const project = projectFiles.find((item) => item.id === socialWindow.projectId)
        if (!project) return null
        const platformName = socialWindow.platform === 'instagram' ? 'Instagram' : 'TikTok'
        const socialUrl = project.social?.[socialWindow.platform]

        return (
          <div
            key={socialWindow.key}
            className={`info-window social-window social-window-${socialWindow.platform}`}
            style={{
              left: `calc(50% + ${socialWindow.x}px)`,
              top: `${socialWindow.y}px`,
              zIndex: 60 + index,
              '--project-color': project.color,
            }}
          >
            <div className="window-bar">
              <div className="window-controls">
                <button type="button" onClick={() => closeSocialWindow(socialWindow.key)} aria-label={`Fermer ${platformName}`} />
                <i />
                <i />
              </div>
              <span>{platformName} — {project.name}</span>
            </div>
            <div className="social-window-body">
              <div className="social-window-badge">
                <span aria-hidden="true">{socialWindow.platform === 'instagram' ? '◎' : '♪'}</span>
                <strong>{platformName}</strong>
              </div>
              <img className="social-window-logo" src={project.logo} alt="" aria-hidden="true" />
              <p>{project.social?.handle}</p>
              <small>Fenêtre intégrée du compte social pour {project.name}.</small>
              <a href={socialUrl} target="_blank" rel="noreferrer" className="social-window-link">
                Ouvrir le vrai compte
              </a>
            </div>
          </div>
        )
      })}

      <div className="desktop-dock" aria-label="Barre d'applications">
        <span className="dock-photopea">Pp</span>
        <span className="dock-lightroom">Lr</span>
        <span className="dock-captions">Cp</span>
        <span className="dock-notion">N</span>
        <span className="dock-capcut">Cc</span>
        <span className="dock-tiktok">Tk</span>
        <span className="dock-instagram">◎</span>
        <i />
        <span className="dock-trash">⌫</span>
      </div>
    </section>
  )
}

const videos = [
  { src: asset('/videos/video-01-web.mp4') },
  { src: asset('/videos/video-02-web.mp4') },
  { src: asset('/videos/video-03-web.mp4') },
  { src: asset('/videos/video-04-web.mp4') },
  { src: asset('/videos/video-05-web.mp4') },
]

const aboutLabels = [
  {
    id: 'naklo',
    title: 'Stabilisateur Manuel',
    subtitle: 'Mon chouchou',
  },
  {
    id: 'riwaya',
    title: 'Gimbal Stick',
    subtitle: 'Banger International',
  },
  {
    id: 'marvelous',
    title: 'LED Selfie',
    subtitle: 'Mon indispensable',
  },
  {
    id: 'voice',
    title: 'VOIX-OFF',
    subtitle: 'Narration commerciale',
  },
  {
    id: 'agency',
    title: 'Batterie externe',
    subtitle: 'Iphone sans cardio bouuuh',
  },
]

const personalityTraits = [
  {
    id: 'amicale',
    label: 'Amicale',
    description: 'Toujours souriante et à l’écoute, je crée facilement des liens avec les personnes qui m’entourent. Avec mes collègues comme dans la vie, je privilégie la bienveillance, l’entraide et une ambiance où chacun se sent à l’aise.',
  },
  {
    id: 'dynamique',
    label: 'Dynamique',
    description: 'J’apporte de l’énergie dans chaque projet. J’aime avancer, proposer de nouvelles idées et entraîner l’équipe avec moi, tout en restant attentive au rythme et aux besoins de chacun.',
  },
  {
    id: 'drole',
    label: 'Drôle',
    description: 'Mon humour spontané rend les échanges plus naturels et les journées plus légères. J’aime détendre l’atmosphère, sans perdre mon sérieux lorsqu’il faut se concentrer sur le travail.',
  },
  {
    id: 'creative',
    label: 'Créative',
    description: 'J’observe les détails, j’imagine des concepts originaux et je cherche toujours une manière personnelle de raconter une histoire. Ma créativité nourrit autant mes contenus que ma façon de résoudre les problèmes.',
  },
  {
    id: 'proactive',
    label: 'Proactive',
    description: 'Je n’attends pas qu’on me dise quoi faire pour avancer. J’anticipe, je prends des initiatives et je propose des solutions concrètes afin de faire progresser les projets avec efficacité.',
  },
]

const defaultAboutSummary = {
  id: 'overview',
  label: 'À propos de moi',
  description: `Madame, Monsieur,

Faites connaissances avec Kawtar, jeune femme de 23 ans en Mastère 2 Communication et Brand Content.

OK, ça c’est la partie formelle, si je devais me décrire en quelques mots, je dirais que j’ai Gilles de la Tourette de la Comm !

Je touche à tout : je crée ; j’imagine ; je filme ;
je monte ; je pilote et bien sûr je CON. VER. TI.
J’aspire à devenir Brand Content Strategist, un métier qui me correspond totalement de par mes connaissances acquises durant mon parcours professionnel, et de mes compétences.

En quoi je me démarque ? Ma soif d'apprendre et d’expérience est ce qui m'anime dans tous les projets que j'entreprends, je m’engage dans des projet de communication par pure passion.

Comment je fais pour ne pas me lasser de mon métier ? J’ai trouvé le secteur d’activité qui stimule les 4 hormones du bonheur simultanément : c’est ce qui rends la source de ma motivation inépuisable.`,
}

function VideoRail() {
  const videoRefs = useRef([])
  const railVideos = [...videos, ...videos]

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return
      video.play().catch(() => {})
    })
  }, [])

  return (
    <aside className="video-rail" aria-label="Selected video work">
      <div className="video-track">
        {railVideos.map((video, index) => (
          <article className="video-card" key={`${video.src}-${index}`}>
            <video
              ref={(element) => { videoRefs.current[index] = element }}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={asset("/hero.png")}
              onLoadedMetadata={(event) => {
                if (!video.src.endsWith('video-05-web.mp4')) return
                event.currentTarget.currentTime = 65
              }}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </article>
        ))}
      </div>
    </aside>
  )
}

export default function App() {
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const bagRef = useRef(null)
  const aboutRef = useRef(null)
  const educationRef = useRef(null)
  const convincedRef = useRef(null)
  const [selectedObject, setSelectedObject] = useState(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [bagVisible, setBagVisible] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)
  const [loadBagScene, setLoadBagScene] = useState(true)
  const [loadSimsScene, setLoadSimsScene] = useState(true)
  const [loadEducationScene, setLoadEducationScene] = useState(true)
  const [educationVisible, setEducationVisible] = useState(false)
  const [ticketPrinted, setTicketPrinted] = useState(false)
  const [selectedTrait, setSelectedTrait] = useState(null)
  const [hoveredTrait, setHoveredTrait] = useState(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [contactOpen, setContactOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const activeTrait = personalityTraits.find((trait) => trait.id === selectedTrait) ?? defaultAboutSummary

  useEffect(() => {
    const projectAssets = projectFiles.flatMap((project) => [
      project.logo,
      ...project.images.map((image) => image.src),
      ...project.videos.map((video) => video.src),
    ])
    const assetsToWarm = [...staticAssetsToPreload, ...videos.map((video) => video.src), ...projectAssets]
    const warmed = new Set()

    assetsToWarm.forEach((url) => {
      if (!url || warmed.has(url)) return
      warmed.add(url)
      fetch(url, { cache: 'force-cache' }).catch(() => {})
    })
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined
    let animationFrame = 0

    const move = (event) => {
      const { clientX, clientY } = event
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect()
        const x = (clientX - bounds.left) / bounds.width - 0.5
        const y = (clientY - bounds.top) / bounds.height - 0.5
        hero.style.setProperty('--portrait-x', `${(x * 20).toFixed(2)}px`)
        hero.style.setProperty('--portrait-y', `${(y * 14).toFixed(2)}px`)
        hero.style.setProperty('--heading-x', `${(x * -60).toFixed(2)}px`)
        hero.style.setProperty('--heading-y', `${(y * -40).toFixed(2)}px`)
        hero.style.setProperty('--heading-rotate', `${(x * -1.2).toFixed(2)}deg`)
        hero.style.setProperty('--portfolio-x', `${(x * -44).toFixed(2)}px`)
        hero.style.setProperty('--portfolio-y', `${(y * -24).toFixed(2)}px`)
        hero.style.setProperty('--script-x', `${(x * 56).toFixed(2)}px`)
        hero.style.setProperty('--script-y', `${(y * 32).toFixed(2)}px`)
        hero.style.setProperty('--script-rotate', `${(x * 2).toFixed(2)}deg`)
      })
    }

    const reset = () => {
      hero.style.removeProperty('--portrait-x')
      hero.style.removeProperty('--portrait-y')
      hero.style.removeProperty('--heading-x')
      hero.style.removeProperty('--heading-y')
      hero.style.removeProperty('--heading-rotate')
      hero.style.removeProperty('--portfolio-x')
      hero.style.removeProperty('--portfolio-y')
      hero.style.removeProperty('--script-x')
      hero.style.removeProperty('--script-y')
      hero.style.removeProperty('--script-rotate')
    }

    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', reset)

    return () => {
      cancelAnimationFrame(animationFrame)
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', reset)
    }
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const bag = bagRef.current
    const about = aboutRef.current
    const education = educationRef.current
    if (!hero || !bag || !about || !education) return undefined

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: .12 },
    )
    const sceneLoadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (entry.target === bag) setLoadBagScene(true)
        if (entry.target === about) setLoadSimsScene(true)
        if (entry.target === education) setLoadEducationScene(true)
      },
      { rootMargin: '300px 0px', threshold: .01 },
    )
    const sceneVisibilityObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.target === bag) {
          setBagVisible(entry.isIntersecting)
          if (entry.isIntersecting) setLoadBagScene(true)
        }
        if (entry.target === about) {
          setAboutVisible(entry.isIntersecting)
          if (entry.isIntersecting) {
            setLoadSimsScene(true)
            fetch(asset('/3D_glb_optimized/tea.glb'), { cache: 'force-cache' }).catch(() => {})
          }
        }
        if (entry.target === education) {
          setEducationVisible(entry.isIntersecting)
          if (entry.isIntersecting) setLoadEducationScene(true)
        }
      }),
      { rootMargin: '-18% 0px -18% 0px', threshold: .01 },
    )

    heroObserver.observe(hero)
    sceneLoadObserver.observe(bag)
    sceneLoadObserver.observe(about)
    sceneLoadObserver.observe(education)
    sceneVisibilityObserver.observe(bag)
    sceneVisibilityObserver.observe(about)
    sceneVisibilityObserver.observe(education)

    return () => {
      heroObserver.disconnect()
      sceneLoadObserver.disconnect()
      sceneVisibilityObserver.disconnect()
    }
  }, [])

  const moveHeading = (event) => {
    const heading = headingRef.current
    if (!heading) return

    const bounds = heading.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    heading.style.setProperty('--hover-x', `${(x * 46).toFixed(2)}px`)
    heading.style.setProperty('--hover-y', `${(y * 30).toFixed(2)}px`)
    heading.style.setProperty('--hover-rotate', `${(x * 2.4).toFixed(2)}deg`)
    heading.style.setProperty('--hover-rotate-negative', `${(x * -2.4).toFixed(2)}deg`)
  }

  const resetHeading = () => {
    const heading = headingRef.current
    if (!heading) return

    heading.style.removeProperty('--hover-x')
    heading.style.removeProperty('--hover-y')
    heading.style.removeProperty('--hover-rotate')
    heading.style.removeProperty('--hover-rotate-negative')
  }

  const moveNoButton = () => {
    const container = convincedRef.current
    if (!container) return

    const bounds = container.getBoundingClientRect()
    const maxX = Math.min(Math.max(bounds.width * .28, 60), 180)
    const maxY = Math.min(Math.max(bounds.height * .18, 34), 120)
    const nextX = (Math.random() - .5) * maxX * 2
    const nextY = (Math.random() - .5) * maxY * 2

    setNoButtonPosition({ x: nextX, y: nextY })
  }

  const openContactPanel = () => {
    setContactOpen(true)
    setNoButtonPosition({ x: 0, y: 0 })
  }

  const updateContactField = (event) => {
    const { name, value } = event.target
    setContactForm((current) => ({ ...current, [name]: value }))
  }

  const submitContactForm = (event) => {
    event.preventDefault()
    const subject = contactForm.name
      ? `Contact portfolio - ${contactForm.name}`
      : 'Contact portfolio Kawtar'
    const body = [
      contactForm.name ? `Nom : ${contactForm.name}` : null,
      contactForm.email ? `Email : ${contactForm.email}` : null,
      '',
      contactForm.message || '',
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:kawtarsouissi@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="portfolio-page">
      <section className="hero" id="home" ref={heroRef}>
        <header className="hero-nav">
          <nav aria-label="Navigation principale">
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="portrait-stage" aria-hidden="true">
          <img className="portrait-blur" src={asset('/hero.png')} alt="Portrait de Kawtar" decoding="async" />
          <img className="portrait-focus" src={asset('/hero.png')} alt="" aria-hidden="true" decoding="async" />
        </div>

        <h1
          className="hero-heading"
          ref={headingRef}
          onPointerMove={moveHeading}
          onPointerLeave={resetHeading}
        >
          <span>Kawtar&apos;s</span>
          <em>portfolio</em>
        </h1>

        <VideoRail />

        <div className="hero-bottom">
        </div>
      </section>

      <section className="bag-section" id="work" ref={bagRef}>
        <div className="bag-title">
          <strong>WHAT&apos;S IN</strong>
          <em>My bag</em>
        </div>

        <div className="bag-labels" aria-label="Matériel de Kawtar">
          {aboutLabels.map((label) => (
            <button
              className={`bag-label bag-label-${label.id}${selectedObject === label.id ? ' is-active' : ''}`}
              type="button"
              key={label.id}
              onClick={() => setSelectedObject(label.id)}
            >
              <strong>{label.title}</strong>
              <em>{label.subtitle}</em>
              <small>{label.date}</small>
            </button>
          ))}
        </div>

        {loadBagScene ? (
          <Suspense fallback={null}>
            <AboutScene active={bagVisible} selected={selectedObject} onSelect={setSelectedObject} />
          </Suspense>
        ) : null}
      </section>

      <section className="about-me-section" id="about" ref={aboutRef}>
        <div className="about-title">
          <strong>ABOUT</strong>
          <em>Meeee</em>
        </div>

        <article className="trait-description" key={activeTrait.id} aria-live="polite">
          {selectedTrait ? <h3>{activeTrait.label}</h3> : null}
          <p>{activeTrait.description}</p>
        </article>

        <div className="about-character" aria-hidden="true">
          <img src={asset('/3D_glb_optimized/kaw.png')} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="trait-list" aria-label="Les qualités de Kawtar">
          {personalityTraits.map((trait) => (
            <button
              className={`trait-pill trait-pill-${trait.id}${selectedTrait === trait.id ? ' is-active' : ''}`}
              type="button"
              key={trait.id}
              aria-label={trait.label}
              aria-pressed={selectedTrait === trait.id}
              onClick={() => setSelectedTrait((current) => (current === trait.id ? null : trait.id))}
              onPointerEnter={() => setHoveredTrait(trait.id)}
              onPointerLeave={() => setHoveredTrait(null)}
            />
          ))}
        </div>

        {loadSimsScene ? (
          <Suspense fallback={null}>
            <SimsAboutScene
              active={aboutVisible}
              selected={hoveredTrait || selectedTrait}
              onSelect={setSelectedTrait}
            />
          </Suspense>
        ) : null}
      </section>

      <section className="education-section" id="education" ref={educationRef}>
        <div className="education-heading education-heading-tea">
          <strong>GURL LET ME SPILL</strong>
          <em>My teaaaaa</em>
        </div>

        <div className="education-heading education-heading-academic">
          <strong>Mon parcours académique ?</strong>
          <em>Lemme show you the receipt...</em>
        </div>

        <div className="tea-backdrop" aria-hidden="true" />
        {loadEducationScene ? (
          <Suspense fallback={null}>
            <EducationTeaScene active={educationVisible} />
          </Suspense>
        ) : null}

        <div className={`receipt-printer${ticketPrinted ? ' is-printing' : ''}`}>
          <div className="printer-stage">
            <img
              className="printer-layer printer-layer-bottom"
              src={asset('/3D_glb_optimized/bas_bouche.png')}
              alt=""
              aria-hidden="true"
              decoding="async"
            />
            <img
              className="printer-layer printer-ticket"
              id="education-ticket"
              src={asset('/3D_glb_optimized/ticket.png')}
              alt="Ticket présentant le parcours académique de Kawtar"
              aria-hidden={!ticketPrinted}
              decoding="async"
            />
            <img
              className="printer-layer printer-layer-top"
              src={asset('/3D_glb_optimized/haut_bouche.png')}
              alt=""
              aria-hidden="true"
              decoding="async"
            />
            <span className="printer-ticket-mask" aria-hidden="true" />
            <button
              className="printer-button"
              type="button"
              aria-controls="education-ticket"
              aria-expanded={ticketPrinted}
              onClick={() => setTicketPrinted((printed) => !printed)}
            >
              {ticketPrinted ? 'Ranger mon ticket' : 'Imprimer mon ticket'}
            </button>
          </div>
        </div>

        <div className="education-bonuses" aria-label="Stages internationaux">
          <article className="education-bonus education-bonus-maroc">
            <strong>Stage Maroc</strong>
            <span>Bon d&apos;achat</span>
          </article>
          <article className="education-bonus education-bonus-dubai">
            <strong>Stage Dubaï</strong>
            <span>Bon d&apos;achat</span>
          </article>
        </div>
      </section>

      <ProjectDesktop />

      <section className="convinced-section" id="contact" ref={convincedRef}>
        <div className={`convinced-card${contactOpen ? ' is-contact-open' : ''}`}>
          {!contactOpen ? (
            <>
              <h2 className="convinced-question">Alors... convaincus ?</h2>
              <div className="convinced-actions">
                <button type="button" className="convinced-yes" onClick={openContactPanel}>
                  Oui
                </button>
                <button
                  type="button"
                  className="convinced-no"
                  style={{
                    '--run-x': `${noButtonPosition.x}px`,
                    '--run-y': `${noButtonPosition.y}px`,
                  }}
                  onPointerEnter={moveNoButton}
                  onMouseDown={moveNoButton}
                  onFocus={moveNoButton}
                  aria-label="Non"
                >
                  Non
                </button>
              </div>
            </>
          ) : (
            <div className="contact-panel">
              <div className="contact-copy">
                <strong>CONTACTEZ-MOI</strong>
                <em>On travaille ensemble ?</em>
                <p>
                  Si mon univers, ma créativité et ma manière de raconter t’ont convaincu,
                  parlons-en. Je suis joignable directement par LinkedIn, par téléphone ou par mail.
                </p>

                <div className="contact-links">
                  <a
                    className="contact-linkedin"
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path fill="currentColor" d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.12V21h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95V21h-4V9Z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a className="contact-phone" href="tel:+33000000000">+33 0 00 00 00 00</a>
                </div>
              </div>

              <form className="contact-form" onSubmit={submitContactForm}>
                <label>
                  <span>Nom</span>
                  <input type="text" name="name" value={contactForm.name} onChange={updateContactField} placeholder="Ton nom" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" value={contactForm.email} onChange={updateContactField} placeholder="tonmail@email.com" />
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" value={contactForm.message} onChange={updateContactField} placeholder="Dis-moi tout..." rows={6} />
                </label>
                <button type="submit" className="contact-submit">Envoyer</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
