import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'

const BASE_URL = import.meta.env.BASE_URL
const asset = (path) => `${BASE_URL}${path.replace(/^\/+/, '')}`

const AboutScene = lazy(() => import('./AboutScene'))
const SimsAboutScene = lazy(() => import('./SimsAboutScene'))
const EducationTeaScene = lazy(() => import('./EducationTeaScene'))

const makeLegacyProjectMedia = (slug, imageCount, videoCount) => ({
  images: Array.from({ length: imageCount }, (_, index) => ({
    src: asset(`/projects/${slug}/gallery-${index + 1}.png`),
    label: `Photo ${String(index + 1).padStart(2, '0')}`,
  })),
  videos: Array.from({ length: videoCount }, (_, index) => ({
    src: asset(`/projects/${slug}/reel-${index + 1}.mp4`),
    poster: asset(`/projects/${slug}/thumb-${index + 1}.jpg`),
    label: `Reel ${String(index + 1).padStart(2, '0')}`,
  })),
})

const makeProjectImages = (slug, imageCount) => Array.from({ length: imageCount }, (_, index) => ({
  src: asset(`/projects/${slug}/gallery-web/image-${index + 1}.jpg`),
  label: `Photo ${String(index + 1).padStart(2, '0')}`,
}))

const makeProjectVideos = (slug, folder, videoCount) => Array.from({ length: videoCount }, (_, index) => ({
  src: asset(`/projects/${slug}/${folder}/video-${index + 1}.mp4`),
  poster: asset(`/projects/${slug}/${folder}/thumb-${index + 1}.jpg`),
  label: `Video ${String(index + 1).padStart(2, '0')}`,
}))

const makeMediaFolder = (name, slug, folder, videoCount) => ({
  name,
  slug: folder,
  videos: makeProjectVideos(slug, folder, videoCount),
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
    folders: [
      { name: 'Contenu promotionnel', slug: 'contenu-promotionnel', videos: [] },
      { name: 'Contenu Trendy', slug: 'contenu-trendy', videos: [] },
      { name: 'Teaser', slug: 'teaser', videos: [] },
      { name: 'Vlog', slug: 'vlog', videos: [] },
    ],
    ...makeLegacyProjectMedia('ks-modesty', 15, 4),
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
    folders: [
      { name: 'Découvertes', slug: 'decouvertes', videos: [] },
      { name: 'Dégustation face cam', slug: 'degustation-face-cam', videos: [] },
      { name: 'Contenu trendy', slug: 'contenu-trendy', videos: [] },
    ],
    ...makeLegacyProjectMedia('naklo-b3da', 10, 8),
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
    folders: [
      makeMediaFolder('Contenu Mariage', 'RIWAYA', 'contenu-mariage', 4),
      makeMediaFolder('Location de Robes', 'RIWAYA', 'location-robes', 4),
      makeMediaFolder('Pâtisserie', 'RIWAYA', 'patisserie', 5),
    ],
    images: makeProjectImages('RIWAYA', 13),
    videos: makeProjectVideos('RIWAYA', 'carousel', 9),
  },
  {
    id: 'dystinct-agency',
    name: 'DYSTINCT AGENCY',
    folder: 'DYSTINCT_AGENCY',
    color: '#183f48',
    accent: '#8fd7d2',
    role: 'Production social media',
    summary: 'Contenus restaurant, lifestyle et activations de marque.',
    period: 'Agence · Brand content',
    mission: 'Produire des formats courts adaptés aux identités de lieux et aux objectifs de communication de chaque marque.',
    services: ['Tournage', 'Montage Reels', 'Contenu food', 'Social media'],
    logo: null,
    logoText: 'DYST',
    social: {},
    folders: [
      makeMediaFolder('Café de la poste', 'dystinct-agency', 'cafe-de-la-poste', 1),
      makeMediaFolder('Italian Canteen', 'dystinct-agency', 'italian-canteen', 4),
      makeMediaFolder('Marvelous Burger', 'dystinct-agency', 'marvelous-burger', 10),
      makeMediaFolder('SLS Collection', 'dystinct-agency', 'sls-collection', 5),
    ],
    images: makeProjectImages('dystinct-agency', 11),
    videos: makeProjectVideos('dystinct-agency', 'carousel', 5),
  },
  {
    id: 'trio-promo',
    name: 'TRIO PROMO',
    folder: 'TRIO_PROMO',
    color: '#7a2531',
    accent: '#f0b26f',
    role: 'Création de contenu promotionnel',
    summary: 'Formats courts orientés promotion, humour, information et événementiel.',
    period: 'Brand content · Promotion',
    mission: 'Décliner une présence vidéo claire et dynamique à travers plusieurs angles éditoriaux adaptés aux réseaux sociaux.',
    services: ['Contenu promotionnel', 'Contenu informatif', 'Humour', 'Gestion de crise'],
    logo: asset('/projects/trio-promo/trio-promo-logo-transparent.png'),
    social: {
      instagram: 'https://www.instagram.com/triopromo54/',
      tiktok: 'https://www.tiktok.com/@trio.promo',
      handle: '@trio.promo',
    },
    folders: [
      makeMediaFolder('Contenu Humour', 'trio-promo', 'contenu-humour', 4),
      makeMediaFolder('Contenu Informatif', 'trio-promo', 'contenu-informatif', 4),
      makeMediaFolder('Contenu Promotionnel', 'trio-promo', 'contenu-promotionnel', 8),
      makeMediaFolder('Événementiel', 'trio-promo', 'evenementiel', 3),
      makeMediaFolder('Gestion de crise', 'trio-promo', 'gestion-de-crise', 1),
    ],
    images: [],
    videos: makeProjectVideos('trio-promo', 'carousel', 4),
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
  const [openMediaFolders, setOpenMediaFolders] = useState([])
  const [openCases, setOpenCases] = useState([])
  const [infoSlides, setInfoSlides] = useState({})
  const [mediaFolderSlides, setMediaFolderSlides] = useState({})
  const [imagePreview, setImagePreview] = useState(null)
  const [manualPlayback, setManualPlayback] = useState({})
  const [videoPlaybackState, setVideoPlaybackState] = useState({})
  const [videoVolumes, setVideoVolumes] = useState({})
  const [windowPositions, setWindowPositions] = useState({})
  const [projectSearch, setProjectSearch] = useState('')
  const [hoveredProjectId, setHoveredProjectId] = useState(null)
  const [recentProjectIds, setRecentProjectIds] = useState([])
  const [desktopNow, setDesktopNow] = useState(() => new Date())
  const dragState = useRef(null)
  const projectVideoRefs = useRef({})
  const [cvOpen, setCvOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [socialWindows] = useState([])

  useEffect(() => {
    if (!openCases.length) return undefined
    const timer = window.setInterval(() => {
      setInfoSlides((current) => {
        const next = { ...current }
        openCases.forEach((id) => {
          if (manualPlayback[id]) return
          const item = projectFiles.find((project) => project.id === id)
          if (item?.videos.length) next[id] = ((current[id] ?? 0) + 1) % item.videos.length
        })
        return next
      })
    }, 4200)

    return () => window.clearInterval(timer)
  }, [manualPlayback, openCases])

  useEffect(() => {
    const timer = window.setInterval(() => setDesktopNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  const rememberProject = (id) => {
    setRecentProjectIds((current) => [id, ...current.filter((item) => item !== id)].slice(0, 3))
  }

  const openProject = (id) => {
    rememberProject(id)
    setOpenFolders((current) => [...current.filter((item) => item !== id), id])
    setWindowPositions((current) => ({
      ...current,
      [`folder-${id}`]: { x: 0, y: 0 },
    }))
  }

  const openProjectCase = (id) => {
    rememberProject(id)
    setOpenCases((current) => [...current.filter((item) => item !== id), id])
    setInfoSlides((current) => ({ ...current, [id]: current[id] ?? 0 }))
    setManualPlayback((current) => ({ ...current, [id]: current[id] ?? false }))
    setVideoPlaybackState((current) => ({ ...current, [id]: current[id] ?? true }))
    setVideoVolumes((current) => ({ ...current, [id]: current[id] ?? 1 }))
    setWindowPositions((current) => ({
      ...current,
      [`case-${id}`]: { x: 0, y: 0 },
    }))
  }

  const openMediaFolder = (projectId, folderSlug) => {
    const project = projectFiles.find((item) => item.id === projectId)
    const folder = project?.folders.find((item) => item.slug === folderSlug)
    if (!folder?.videos.length) return
    rememberProject(projectId)
    const key = `${projectId}-${folderSlug}`
    setOpenMediaFolders((current) => [...current.filter((item) => item.key !== key), { key, projectId, folderSlug }])
    setMediaFolderSlides((current) => ({ ...current, [key]: current[key] ?? 0 }))
    setWindowPositions((current) => ({
      ...current,
      [`media-${key}`]: { x: 0, y: 0 },
    }))
  }

  const closeFolder = (id) => {
    setOpenFolders((current) => current.filter((item) => item !== id))
  }

  const closeMediaFolder = (key) => {
    setOpenMediaFolders((current) => current.filter((item) => item.key !== key))
  }

  const closeCase = (id) => {
    setOpenCases((current) => current.filter((item) => item !== id))
    setImagePreview((current) => (current?.projectId === id ? null : current))
  }

  const openSocialWindow = (projectId, platform) => {
    const project = projectFiles.find((item) => item.id === projectId)
    const url = project?.social?.[platform]
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const closeSocialWindow = () => {}

  const closeAllWindows = () => {
    setOpenFolders([])
    setOpenMediaFolders([])
    setOpenCases([])
    setCvOpen(false)
    setLetterOpen(false)
    setImagePreview(null)
    setManualPlayback({})
  }

  const getWindowPosition = (id, fallback = { x: 0, y: 0 }) => windowPositions[id] ?? fallback
  const normalizedProjectSearch = projectSearch.trim().toLowerCase()
  const visibleProjects = projectFiles.filter((project) => {
    if (!normalizedProjectSearch) return true
    return [
      project.name,
      project.folder,
      project.role,
      project.summary,
      ...project.folders.map((folder) => folder.name),
    ].join(' ').toLowerCase().includes(normalizedProjectSearch)
  })
  const hoveredProject = projectFiles.find((project) => project.id === hoveredProjectId)
  const spotlightProject = hoveredProject ?? visibleProjects[0] ?? projectFiles[0]
  const totalVideoCount = projectFiles.reduce((count, project) => count + project.videos.length + project.folders.reduce((folderCount, folder) => folderCount + folder.videos.length, 0), 0)
  const totalImageCount = projectFiles.reduce((count, project) => count + project.images.length, 0)
  const recentProjects = recentProjectIds
    .map((id) => projectFiles.find((project) => project.id === id))
    .filter(Boolean)
  const desktopDateLabel = desktopNow.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
  const desktopTimeLabel = desktopNow.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })

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

  const selectFolderVideo = (key, index) => {
    setMediaFolderSlides((current) => ({ ...current, [key]: index }))
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
    if (event.target.closest('button, input, a, video, object')) return
    if (id.startsWith('case-')) focusProject(id.replace(/^case-/, ''))
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
          <time>{desktopDateLabel}&nbsp;&nbsp;{desktopTimeLabel}</time>
        </div>
      </header>

      <div className="desktop-title">
        <strong>PROJECTS &amp; EXPERIENCE</strong>
        <em>Kawtar&apos;s desktop</em>
      </div>

      <label className="desktop-spotlight">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={projectSearch}
          onChange={(event) => setProjectSearch(event.target.value)}
          placeholder="Rechercher un projet..."
          aria-label="Rechercher un projet"
        />
        <small>{visibleProjects.length}/{projectFiles.length}</small>
      </label>

      <div className="desktop-folders">
        {projectFiles.map((item, index) => {
          const isVisible = visibleProjects.some((project) => project.id === item.id)

          return (
          <button
            className={`desktop-folder folder-${index + 1} project-folder-${item.id}${openFolders.includes(item.id) ? ' is-selected' : ''}${isVisible ? '' : ' is-filtered-out'}`}
            type="button"
            key={item.id}
            onDoubleClick={() => openProject(item.id)}
            onClick={() => openProject(item.id)}
            onPointerEnter={() => setHoveredProjectId(item.id)}
            onPointerLeave={() => setHoveredProjectId((current) => (current === item.id ? null : current))}
            onFocus={() => setHoveredProjectId(item.id)}
            onBlur={() => setHoveredProjectId((current) => (current === item.id ? null : current))}
            style={{ '--folder-color': item.color, '--folder-accent': item.accent }}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
          >
            <span className="folder-icon" aria-hidden="true">
              {item.logo ? <img src={item.logo} alt="" /> : <strong>{item.logoText ?? item.name.slice(0, 2)}</strong>}
              <b className="folder-notification">{item.folders.length + 1}</b>
            </span>
            <span>{item.folder}</span>
          </button>
          )
        })}
      </div>

      <aside className={`desktop-project-peek${hoveredProject ? ' is-visible' : ''}`} style={{ '--project-color': spotlightProject.color }}>
        <span>Focus</span>
        <strong>{spotlightProject.name}</strong>
        <p>{spotlightProject.summary}</p>
        <div>
          <small>{spotlightProject.videos.length} previews</small>
          <small>{spotlightProject.folders.length} dossiers</small>
          <small>{spotlightProject.images.length} images</small>
        </div>
      </aside>

      <aside className="desktop-activity-widget">
        <span>Studio</span>
        <strong>{projectFiles.length} projets</strong>
        <p>{totalVideoCount} vidéos · {totalImageCount} images</p>
        <meter min="0" max="100" value="74">74%</meter>
      </aside>

      {recentProjects.length ? (
        <aside className="desktop-recent-widget" aria-label="Projets récents">
          <span>Recent</span>
          <div>
            {recentProjects.map((project) => (
              <button
                type="button"
                key={`recent-${project.id}`}
                onClick={() => openProjectCase(project.id)}
                style={{ '--project-color': project.color }}
              >
                <i aria-hidden="true" />
                <b>{project.name}</b>
              </button>
            ))}
          </div>
        </aside>
      ) : null}

      <aside className="desktop-sticky-note" aria-label="Note de Kawtar">
        <header>
          <span>Notes</span>
          <time>20:19</time>
        </header>
        <strong>À ne pas oublier ✦</strong>
        <p>Créer avec intention,<br />raconter avec émotion<br />et toujours oser.</p>
        <small>— Kawtar</small>
      </aside>

      <button
        className="desktop-cv-file"
        type="button"
        onClick={() => {
          setWindowPositions((current) => ({ ...current, cv: { x: 0, y: 0 } }))
          setCvOpen(true)
        }}
      >
        <span className="cv-paper" aria-hidden="true">
          <i>PDF</i>
          <b>KS</b>
          <em />
          <em />
          <em />
        </span>
        <span>KAWTAR_CV.pdf</span>
      </button>

      <button
        className="desktop-letter-file"
        type="button"
        onClick={() => {
          setWindowPositions((current) => ({ ...current, letter: { x: 0, y: 0 } }))
          setLetterOpen(true)
        }}
      >
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
        <div
          className="cv-window desktop-resizable-window"
          style={{
            '--window-x': `${getWindowPosition('cv').x}px`,
            '--window-y': `${getWindowPosition('cv').y}px`,
          }}
        >
          <div className="window-bar" onPointerDown={(event) => startMoving(event, 'cv')}>
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
        <div
          className="cv-window letter-window desktop-resizable-window"
          style={{
            '--window-x': `${getWindowPosition('letter').x}px`,
            '--window-y': `${getWindowPosition('letter').y}px`,
          }}
        >
          <div className="window-bar" onPointerDown={(event) => startMoving(event, 'letter')}>
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
        const folderWindowId = `folder-${project.id}`
        const folderPosition = getWindowPosition(folderWindowId)

        return (
          <div
            className="project-window desktop-resizable-window"
            key={`folder-${project.id}`}
            style={{
              '--window-x': `${folderPosition.x}px`,
              '--window-y': `${folderPosition.y}px`,
              left: '50%',
              top: '50%',
              zIndex: 20 + windowIndex,
            }}
          >
            <div className="window-bar" onPointerDown={(event) => startMoving(event, folderWindowId)}>
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
                    {project.logo ? <img src={project.logo} alt="" /> : <b>{project.logoText ?? project.name.slice(0, 2)}</b>}
                  </span>
                  <em>open me</em>
                  <small>{project.folder}.exe</small>
                </button>

                {project.folders.map((folder) => (
                  <button
                    type="button"
                    className={`media-file project-subfolder${folder.videos.length ? ' has-videos' : ''}`}
                    key={`${project.id}-${folder.slug}`}
                    onClick={() => openMediaFolder(project.id, folder.slug)}
                    disabled={!folder.videos.length}
                    style={{ '--project-color': project.color, '--project-accent': project.accent }}
                  >
                    <span className="folder-preview" aria-hidden="true">
                      <i />
                    </span>
                    <small>{folder.name}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {openMediaFolders.map((entry, windowIndex) => {
        const project = projectFiles.find((item) => item.id === entry.projectId)
        const folder = project?.folders.find((item) => item.slug === entry.folderSlug)
        if (!project || !folder?.videos.length) return null
        const selectedIndex = mediaFolderSlides[entry.key] ?? 0
        const currentVideo = folder.videos[selectedIndex] ?? folder.videos[0]
        const mediaPosition = getWindowPosition(`media-${entry.key}`)

        return (
          <div
            className="media-window themed-media-window desktop-resizable-window"
            key={entry.key}
            style={{
              '--project-color': project.color,
              '--window-x': `${mediaPosition.x}px`,
              '--window-y': `${mediaPosition.y}px`,
              left: '50%',
              top: '50%',
              zIndex: 70 + windowIndex,
            }}
          >
            <div className="window-bar" onPointerDown={(event) => startMoving(event, `media-${entry.key}`)}>
              <div className="window-controls">
                <button type="button" onClick={() => closeMediaFolder(entry.key)} aria-label="Fermer le dossier média" />
                <i />
                <i />
              </div>
              <span>{project.folder} / {folder.name}</span>
            </div>
            <div className="media-window-content themed-media-player">
              <div className="reel-device">
                <video
                  key={currentVideo.src}
                  src={currentVideo.src}
                  poster={currentVideo.poster}
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(event) => {
                    event.currentTarget.muted = true
                    void event.currentTarget.play().catch(() => {})
                  }}
                />
              </div>
            </div>
            <div className="media-window-footer themed-media-footer">
              <strong>{folder.name}</strong>
              <span>Player</span>
              <small>{String(selectedIndex + 1).padStart(2, '0')} / {String(folder.videos.length).padStart(2, '0')}</small>
            </div>
            <div className="folder-video-strip" aria-label={`Vidéos disponibles dans ${folder.name}`}>
              {folder.videos.map((video, index) => (
                <button
                  type="button"
                  key={video.src}
                  className={`folder-video-thumb${selectedIndex === index ? ' is-active' : ''}`}
                  onClick={() => selectFolderVideo(entry.key, index)}
                  aria-label={`Ouvrir ${video.label}`}
                >
                  <img src={video.poster} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
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
        const position = getWindowPosition(`case-${projectId}`, {
          x: 0,
          y: 0,
        })
        const activeImagePreview = imagePreview?.projectId === projectId
          ? imagePreview
          : project.images[0]

        return (
        <div
          className="info-window case-study-window desktop-resizable-window"
          key={project.id}
          onPointerDown={() => focusProject(project.id)}
          style={{
            '--project-color': project.color,
            '--window-x': `${position.x}px`,
            '--window-y': `${position.y}px`,
            zIndex: 30 + windowIndex,
          }}
        >
          <div className="window-bar" onPointerDown={(event) => startMoving(event, `case-${project.id}`)}>
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
              <div className={`project-story-panel project-story-${project.id}`}>
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
                ) : project.id === 'dystinct-agency' ? (
                  <>
                    <div className="experience-brand dystinct-brand" aria-hidden="true">Dystinct Agency</div>
                    <section className="experience-info-text">
                      <h4>EXPÉRIENCE</h4>
                      <p>Mon expérience chez Dystinct Agency a marqué un véritable tournant dans mon parcours. En intégrant cette agence de communication parisienne, j’ai eu l’opportunité de collaborer avec des marques issues de secteurs très variés, tout en développant une véritable expertise dans l’univers de la food, un domaine qui me passionne particulièrement. Cette immersion m’a permis de gagner en rigueur, en professionnalisme et en polyvalence, en apprenant à concevoir des stratégies de communication, créer du contenu à forte valeur ajoutée et répondre aux attentes de clients aux univers très différents. Une expérience aussi enrichissante qu’exigeante, qui a renforcé ma vision de la communication et confirmé mon envie d’en faire bien plus qu’un métier.</p>
                    </section>
                    <p className="case-study-period">{project.period}</p>
                  </>
                ) : project.id === 'trio-promo' ? (
                  <>
                    <img className="experience-brand trio-brand" src={asset('/projects/trio-promo/trio-promo-logo-transparent.png')} alt="Trio Promo" />
                    <section className="experience-info-text">
                      <h4>EXPÉRIENCE</h4>
                      <p>Mon expérience chez Trio Promo a été un véritable défi… et sans doute l’une de celles qui m’ont le plus fait évoluer. En rejoignant ce magasin de déstockage alimentaire, je suis sortie de ma zone de confort : je devais m’adresser à une cible bien plus âgée, sur une communication principalement orientée vers Facebook, un univers très différent de celui auquel j’étais habituée. Plutôt que de reproduire ce qui existait déjà, j’ai choisi d’y apporter ma vision en développant un contenu plus moderne, plus dynamique et plus engageant. Petit à petit, une clientèle plus jeune, qui ne s’intéressait pas naturellement à ce type d’enseigne, a commencé à découvrir le magasin à travers mes contenus. Cette expérience m’a appris à adapter ma créativité à des contraintes très différentes, à construire une stratégie adaptée au terrain et à sortir de mes automatismes. J’en ressors avec une plus grande capacité d’adaptation et surtout une meilleure compréhension des enjeux de communication locale.</p>
                    </section>
                    <p className="case-study-period">{project.period}</p>
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
              </div>
              {project.images.length ? (
                <div className="project-gallery-panel">
                  <div className="project-panel-label">
                    <span>Gallery</span>
                    <small>{String(project.images.length).padStart(2, '0')} images</small>
                  </div>
                  <div className="project-gallery-board" aria-label={`Galerie photo ${project.name}`}>
                    <figure className="project-gallery-feature">
                      <img src={activeImagePreview.src} alt={`${project.name} — ${activeImagePreview.label}`} />
                    </figure>
                    <div className="project-image-grid">
                      {project.images.map((image) => (
                        <figure
                          key={image.src}
                          className={activeImagePreview.src === image.src ? 'is-active' : ''}
                          onPointerEnter={() => setImagePreview({ projectId: project.id, ...image })}
                          onFocus={() => setImagePreview({ projectId: project.id, ...image })}
                          tabIndex={0}
                        >
                          <img src={image.src} alt={`${project.name} — ${image.label}`} loading="lazy" decoding="async" />
                        </figure>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
              {project.social?.instagram || project.social?.tiktok ? (
                <div className="project-socials" aria-label={`Réseaux sociaux ${project.name}`}>
                  {project.social?.instagram ? (
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
                  ) : null}
                  {project.social?.tiktok ? (
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
                  ) : null}
                </div>
              ) : null}
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
                  ref={(node) => {
                    if (node) projectVideoRefs.current[project.id] = node
                  }}
                  src={currentSlide?.src}
                  autoPlay
                  loop={!isManualMode}
                  muted={!isManualMode || volume === 0}
                  controls={false}
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(event) => {
                    event.currentTarget.volume = volume
                    if (isManualMode) {
                      void event.currentTarget.play()
                    } else {
                      void event.currentTarget.play().catch(() => {})
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
                    <img src={media.poster} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
              {project.folders.length ? (
                <div className="project-folder-access" aria-label={`Dossiers disponibles pour ${project.name}`}>
                  <div className="project-folder-access-header">
                    <span>Dossiers</span>
                    <small>{String(project.folders.length).padStart(2, '0')}</small>
                  </div>
                  <div className="project-folder-buttons">
                    {project.folders.map((folder) => (
                      <button
                        type="button"
                        key={`${project.id}-case-${folder.slug}`}
                        className="project-folder-access-button"
                        onClick={() => (folder.videos.length ? openMediaFolder(project.id, folder.slug) : openProject(project.id))}
                      >
                        <span className="case-folder-icon" aria-hidden="true" />
                        <small>{folder.name}</small>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
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
        <button type="button" className="dock-trash" onClick={closeAllWindows} aria-label="Tout fermer">⌫</button>
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

        <div className="education-bonuses" aria-label="Bons d'achat des stages internationaux">
          <article className="education-bonus education-bonus-maroc">
            <span className="bonus-ribbon" aria-hidden="true">
              <i />
            </span>
            <div>
              <strong>Stage Maroc</strong>
              <em>Bon d&apos;achat</em>
              <small>Casablanca · 2024</small>
            </div>
            <span className="bonus-barcode" aria-hidden="true" />
          </article>
          <article className="education-bonus education-bonus-dubai">
            <span className="bonus-ribbon" aria-hidden="true">
              <i />
            </span>
            <div>
              <strong>Stage Dubaï</strong>
              <em>Bon d&apos;achat</em>
              <small>Dubaï · 2025</small>
            </div>
            <span className="bonus-barcode" aria-hidden="true" />
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
