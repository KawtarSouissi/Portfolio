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
    summary: 'Direction crÃ©ative, contenu et identitÃ© digitale.',
    period: 'Projet personnel Â· Mode',
    mission: 'CrÃ©er un univers cohÃ©rent autour de la modest fashion et produire des contenus capables de prÃ©senter les collections avec une identitÃ© forte.',
    services: ['Direction crÃ©ative', 'CrÃ©ation de contenu', 'Social media', 'Campagnes vidÃ©o'],
    logo: asset('/projects/KSMODESTY/KS_logo.png'),
    social: {
      instagram: 'https://www.instagram.com/ksmodesty/',
      tiktok: 'https://www.tiktok.com/@ksmodesty',
      handle: '@ksmodesty',
    },
    ...makeProjectMedia('ks-modesty', 15, 4),
  },
  {
    id: 'naklo-b3da',
    name: 'NAKLO B3DA',
    folder: 'NAKLO_B3DA',
    color: '#315c4c',
    accent: '#cbd9b6',
    role: 'CrÃ©ation de contenu',
    summary: 'Production visuelle et contenus food actuels.',
    period: 'CrÃ©ation de contenu Â· Food',
    mission: 'DÃ©couvrir des adresses, raconter une expÃ©rience culinaire et transformer chaque dÃ©gustation en contenu court, spontanÃ© et engageant.',
    services: ['Concept Ã©ditorial', 'Tournage', 'Montage Reels', 'PrÃ©sentation camÃ©ra'],
    logo: asset('/projects/naklo-b3da/NAKBLO_LOGO.png'),
    social: {
      instagram: 'https://www.instagram.com/naklob3da/',
      tiktok: 'https://www.tiktok.com/@naklob3da',
      handle: '@naklob3da',
    },
    ...makeProjectMedia('naklo-b3da', 10, 8),
  },
  {
    id: 'riwaya',
    name: 'RIWAYA',
    folder: 'RIWAYA',
    color: '#5d397f',
    accent: '#d2bde4',
    role: 'Production Ã©vÃ©nementielle',
    summary: 'Captation, storytelling et contenus Ã©vÃ©nementiels.',
    period: 'Production Â· Ã‰vÃ©nementiel',
    mission: 'Mettre en valeur les dÃ©cors, les crÃ©ations et les moments forts Ã  travers une narration visuelle Ã©lÃ©gante pensÃ©e pour les rÃ©seaux sociaux.',
    services: ['Captation Ã©vÃ©nementielle', 'Storytelling', 'Montage', 'Community management'],
    logo: asset('/projects/RIWAYA/riwaya_logo.png'),
    social: {
      instagram: 'https://www.instagram.com/riwaya_prod/',
      tiktok: 'https://www.tiktok.com/@riwaya_prod',
      handle: '@riwaya_prod',
    },
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
  const [infoSlides, setInfoSlides] = useState({})
  const [windowPositions, setWindowPositions] = useState({})
  const dragState = useRef(null)
  const [cvOpen, setCvOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [socialWindows] = useState([])

  useEffect(() => {
    if (!openFolders.length) return undefined
    const timer = window.setInterval(() => {
      setInfoSlides((current) => {
        const next = { ...current }
        openFolders.forEach((id) => {
          const item = projectFiles.find((project) => project.id === id)
          if (item) next[id] = ((current[id] ?? 0) + 1) % item.videos.length
        })
        return next
      })
    }, 4200)

    return () => window.clearInterval(timer)
  }, [openFolders])

  const openProject = (id) => {
    setOpenFolders((current) => [...current.filter((item) => item !== id), id])
    setInfoSlides((current) => ({ ...current, [id]: current[id] ?? 0 }))
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
    setInfoSlides((current) => ({
      ...current,
      [id]: ((current[id] ?? 0) + direction + project.videos.length) % project.videos.length,
    }))
  }

  const focusProject = (id) => {
    setOpenFolders((current) => [...current.filter((item) => item !== id), id])
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
    <section className="projects-section" id="projects" aria-label="Projets et expÃ©riences">
      <div className="projects-wallpaper" aria-hidden="true">
        <img src={asset("/macbook-projects-wallpaper.png")} alt="" loading="lazy" decoding="async" />
      </div>

      <header className="projects-menu">
        <div className="mac-menu-left">
          <strong aria-label="Apple">â—</strong>
          <b>Finder</b>
          <span>Fichier</span>
          <span>Ã‰dition</span>
          <span>PrÃ©sentation</span>
          <span>Aller</span>
          <span>FenÃªtre</span>
          <span>Aide</span>
        </div>
        <div className="mac-menu-right">
          <span>âŒ</span>
          <span>âŒ•</span>
          <span>â–°</span>
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
        <strong>Ã€ ne pas oublier âœ¦</strong>
        <p>CrÃ©er avec intention,<br />raconter avec Ã©motion<br />et toujours oser.</p>
        <small>â€” Kawtar</small>
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
            <span>KAWTAR_CV.pdf â€” AperÃ§u</span>
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
            <span>Lettre de motivation Kawtar Souissi.pdf â€” AperÃ§u</span>
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
        const infoSlide = infoSlides[projectId] ?? 0
        const currentSlide = project.videos[infoSlide]
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
              <button type="button" onClick={() => closeFolder(project.id)} aria-label="Fermer le projet" />
              <i />
              <i />
            </div>
            <span>{project.folder}.EXE â€” Information about: {project.name}</span>
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
                    <p>Jâ€™AI DÃ‰CIDÃ‰ DE NOMMER MON COMPTE â€œNAKLO B3DA W I7EN LAHâ€, UNE EXPRESSION TIRÃ‰E TOUT DROIT DU DIALECTE MAROCAIN, ELLE SIGNIFIE â€œMANGEONS Dâ€™ABORD, DIEU Sâ€™OCCUPERA DU RESTEâ€. Câ€™EST UNE EXPRESSION CÃ‰LÃˆBRE DANS LA CULTURE MAROCAINE, ELLE PERMETS DE RECENTRER LE SUJET SUR LE PLUS IMPORTANT; LA SIMPLICITÃ‰ DE PARTAGER UN MOMENT DE CONVIVIALITÃ‰ AUTOUR Dâ€™UN BON PLAT, ET DE LAISSER LE RESTE AUX MAINS DE DIEU.</p>
                  </section>
                  <section className="naklo-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>Ã‰TANT FRANCO-MAROCAINE ET GRANDE ADEPTE DE TOUT CE QUI EST RELIÃ‰ DE PRÃˆS OU DE LOIN Ã€ LA NOURRITURE, JE ME DEVAIS DE CRÃ‰ER UN CONCEPT QUI PERMETTRAIS Ã€ MA COMMUNAUTÃ‰ DE DÃ‰COUVRIR DE NOUVELLES SPÃ‰CIALITÃ‰S CULINAIRES ET ACTIVITÃ‰S EXISTANTES EN FRANCE ET AU MAROC. OBJECTIF ? PARTAGER UN UNIVERS QUI ME PASSIONNE; PROMOUVOIR Lâ€™INCLUSIVITÃ‰ ET Lâ€™ACCESSIBILITÃ‰ Ã€ TRAVERS LA DÃ‰COUVERTE DE LIEUX QUI ONT POUR CIBLES TOUT TYPE DE PROFIL CLIENTS. MA SÅ’UR Mâ€™A JOINT DANS CE MAGNIFIQUE PROJET : BIENVENUS DANS NOTRE UNIVERS.</p>
                  </section>
                </>
              ) : project.id === 'ks-modesty' ? (
                <>
                  <img className="ks-info-logo" src={asset("/projects/KSMODESTY/KS_logo.png")} alt="KS Modesty" />
                  <section className="ks-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>Jâ€™AI DÃ‰VELOPPÃ‰ UN PROJET QUI ME RESSEMBLE ET QUI RÃ‰PONDAIT Ã€ UN RÃ‰EL BESOIN SUR LE MARCHÃ‰. KS MODESTY EST UNE MARQUE SPÃ‰CIALISÃ‰E DANS LES VOILES Dâ€™EXCEPTION, ET SE DISTINGUE PAR UNE APPROCHE NOVATRICE, LE MESSAGE QUE JE SOUHAITE PASSER EST QUâ€™UNE FEMME QUI FAIS LE CHOIX VESTIMENTAIRE DU VOILE, NE DOIT PAS SE PERDRE DANS LES ATTENTES DE LA SOCIÃ‰TÃ‰ Ã€ CE QUâ€™ELLE SE VÃŠTISSE DE MANIÃˆRE MONOTONE ET SANS EXTRAVAGANCE. BREF Jâ€™EN AI DIS ASSEZ.</p>
                  </section>
                </>
              ) : project.id === 'riwaya' ? (
                <>
                  <img className="riwaya-info-logo" src={asset("/projects/RIWAYA/riwaya_logo.png")} alt="RiwÄya" />
                  <section className="riwaya-info-text">
                    <h4>ORIGINE <em>de notre nom</em></h4>
                    <p>Riwaya signifie Â« histoire Â» ou Â« rÃ©cit Â» en arabe. Un nom qui reflÃ¨te parfaitement ma vision de la crÃ©ation de contenu Ã©vÃ©nementiel : chaque Ã©vÃ©nement raconte une histoire unique. DerriÃ¨re chaque regard, chaque dÃ©tail, il y a un rÃ©cit qui mÃ©rite dâ€™Ãªtre capturÃ© et transmis.</p>
                  </section>
                  <section className="riwaya-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>Jâ€™AI LANCÃ‰ CE COMPTE DE CRÃ‰ATION DE CONTENU Ã‰VÃ‰NEMENTIEL PARCE QUâ€™IL RÃ‰UNIT TOUT CE QUI ME PASSIONNE : Lâ€™ESTHÃ‰TIQUE, LE SENS DU DÃ‰TAIL, LA CRÃ‰ATION DE CONTENU ET SURTOUT Lâ€™Ã‰MOTION HUMAINE. Jâ€™AIME CAPTURER CES INSTANTS QUI NE SE REPRODUIRONT JAMAIS DEUX FOIS, METTRE EN LUMIÃˆRE LA BEAUTÃ‰ Dâ€™UN MOMENT, Dâ€™UN LIEU OU Dâ€™UNE HISTOIRE Ã€ TRAVERS MON REGARD. CHAQUE Ã‰VÃ‰NEMENT EST UNE OCCASION DE RACONTER QUELQUE CHOSE Dâ€™UNIQUE, DE TRANSFORMER DES SOUVENIRS EN IMAGES ET DE FAIRE RESSENTIR AUX AUTRES UNE ATMOSPHÃˆRE BIEN PRÃ‰CISE.</p>
                  </section>
                </>
              ) : (
                <>
              <div className="case-study-index">PROJECT FILE / 0{projectFiles.findIndex((item) => item.id === project.id) + 1}</div>
              <h3>{project.name}</h3>
              <p className="case-study-period">{project.period}</p>
              <p className="case-study-mission">{project.mission}</p>
              <dl>
                <dt>RÃ´le</dt>
                <dd>{project.role}</dd>
                <dt>MÃ©dias</dt>
                <dd>{project.videos.length} vidÃ©os Â· {project.images.length} images</dd>
              </dl>
              <div className="case-study-services">
                {project.services.map((service) => <span key={service}>{service}</span>)}
              </div>
                </>
              )}
              <div className="project-image-grid" aria-label={`Galerie photo ${project.name}`}>
                {project.images.map((image) => (
                  <figure key={image.src}>
                    <img src={image.src} alt={`${project.name} â€” ${image.label}`} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
              <div className="project-socials" aria-label={`RÃ©seaux sociaux ${project.name}`}>
                <button
                  type="button"
                  className="project-social project-social-instagram"
                  onClick={() => openSocialWindow(project.id, 'instagram')}
                  aria-label={`Ouvrir la fenÃªtre Instagram de ${project.name}`}
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
                  aria-label={`Ouvrir la fenÃªtre TikTok de ${project.name}`}
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
                  src={currentSlide?.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="carousel-media-overlay">
                  <span>MOTION</span>
                  <strong>{currentSlide?.label}</strong>
                </div>
                <button type="button" className="carousel-arrow carousel-prev" onClick={() => moveInfoSlide(project.id, -1)} aria-label="MÃ©dia prÃ©cÃ©dent">â€¹</button>
                <button type="button" className="carousel-arrow carousel-next" onClick={() => moveInfoSlide(project.id, 1)} aria-label="MÃ©dia suivant">â€º</button>
              </div>
              <div className="carousel-caption">
                <span>Selected work Â· {project.name}</span>
                <small>{String(infoSlide + 1).padStart(2, '0')} / {String(project.videos.length).padStart(2, '0')}</small>
              </div>
              <div className="carousel-dots" aria-label="Choisir un mÃ©dia">
                {project.videos.map((media, index) => (
                  <button
                    type="button"
                    key={media.src}
                    className={infoSlide === index ? 'is-active' : ''}
                    onClick={() => setInfoSlides((current) => ({ ...current, [project.id]: index }))}
                    aria-label={`Afficher le mÃ©dia ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        )
      })}

      <div className="desktop-hint">Clique sur un dossier pour lâ€™ouvrir</div>

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
              <span>{platformName} â€” {project.name}</span>
            </div>
            <div className="social-window-body">
              <div className="social-window-badge">
                <span aria-hidden="true">{socialWindow.platform === 'instagram' ? 'â—Ž' : 'â™ª'}</span>
                <strong>{platformName}</strong>
              </div>
              <img className="social-window-logo" src={project.logo} alt="" aria-hidden="true" />
              <p>{project.social?.handle}</p>
              <small>FenÃªtre intÃ©grÃ©e du compte social pour {project.name}.</small>
              <a href={socialUrl} target="_blank" rel="noreferrer" className="social-window-link">
                Ouvrir le vrai compte
              </a>
            </div>
          </div>
        )
      })}

      <div className="desktop-dock" aria-label="Barre d'applications">
        <span className="dock-finder">â—</span>
        <span className="dock-ps">Ps</span>
        <span className="dock-ai">Ai</span>
        <span className="dock-video">â–¶</span>
        <span className="dock-notes">â–¤</span>
        <span className="dock-photos">âœ¿</span>
        <span className="dock-instagram">â—Ž</span>
        <span className="dock-mail">âœ‰</span>
        <i />
        <span className="dock-trash">âŒ«</span>
      </div>
    </section>
  )
}

const videos = [
  { src: asset('/videos/video-01-web.mp4') },
  { src: asset('/videos/video-02-web.mp4') },
  { src: asset('/videos/video-03-web.mp4') },
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
    description: 'Toujours souriante et Ã  lâ€™Ã©coute, je crÃ©e facilement des liens avec les personnes qui mâ€™entourent. Avec mes collÃ¨gues comme dans la vie, je privilÃ©gie la bienveillance, lâ€™entraide et une ambiance oÃ¹ chacun se sent Ã  lâ€™aise.',
  },
  {
    id: 'dynamique',
    label: 'Dynamique',
    description: 'Jâ€™apporte de lâ€™Ã©nergie dans chaque projet. Jâ€™aime avancer, proposer de nouvelles idÃ©es et entraÃ®ner lâ€™Ã©quipe avec moi, tout en restant attentive au rythme et aux besoins de chacun.',
  },
  {
    id: 'drole',
    label: 'DrÃ´le',
    description: 'Mon humour spontanÃ© rend les Ã©changes plus naturels et les journÃ©es plus lÃ©gÃ¨res. Jâ€™aime dÃ©tendre lâ€™atmosphÃ¨re, sans perdre mon sÃ©rieux lorsquâ€™il faut se concentrer sur le travail.',
  },
  {
    id: 'creative',
    label: 'CrÃ©ative',
    description: 'Jâ€™observe les dÃ©tails, jâ€™imagine des concepts originaux et je cherche toujours une maniÃ¨re personnelle de raconter une histoire. Ma crÃ©ativitÃ© nourrit autant mes contenus que ma faÃ§on de rÃ©soudre les problÃ¨mes.',
  },
  {
    id: 'proactive',
    label: 'Proactive',
    description: 'Je nâ€™attends pas quâ€™on me dise quoi faire pour avancer. Jâ€™anticipe, je prends des initiatives et je propose des solutions concrÃ¨tes afin de faire progresser les projets avec efficacitÃ©.',
  },
]

function VideoRail({ active }) {
  const videoRefs = useRef([])

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return
      if (active) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [active])

  return (
    <aside className={`video-rail${active ? '' : ' is-paused'}`} aria-label="Selected video work">
      <div className="video-track">
        {videos.map((video, index) => (
          <article className="video-card" key={`${video.src}-${index}`}>
            <video
              ref={(element) => { videoRefs.current[index] = element }}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={asset("/hero.png")}
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
  const [selectedObject, setSelectedObject] = useState(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [bagVisible, setBagVisible] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)
  const [loadBagScene, setLoadBagScene] = useState(true)
  const [loadSimsScene, setLoadSimsScene] = useState(true)
  const [loadEducationScene, setLoadEducationScene] = useState(true)
  const [educationVisible, setEducationVisible] = useState(false)
  const [ticketPrinted, setTicketPrinted] = useState(false)
  const [selectedTrait, setSelectedTrait] = useState('amicale')
  const [hoveredTrait, setHoveredTrait] = useState(null)
  const activeTrait = personalityTraits.find((trait) => trait.id === selectedTrait) ?? personalityTraits[0]

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

  return (
    <main className="portfolio-page">
      <section className="hero" id="home" ref={heroRef}>
        <header className="hero-nav">
          <a className="brand" href="#home">Kawtar</a>
          <nav aria-label="Navigation principale">
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <a
          className="portrait-stage"
          href="#about"
          aria-label="DÃ©couvrir plus d'informations sur Kawtar"
        >
          <img className="portrait-blur" src={asset('/hero.png')} alt="Portrait de Kawtar" decoding="async" />
          <img className="portrait-focus" src={asset('/hero.png')} alt="" aria-hidden="true" decoding="async" />
          <span className="portrait-cta" aria-hidden="true">
            <span>Plus d&apos;info<br />sur moi</span>
            <svg viewBox="0 0 150 110" role="presentation">
              <path d="M8 18C46 7 93 20 112 49C124 67 115 83 91 87" />
              <path d="M101 70C97 78 93 84 82 91C92 94 101 98 108 104" />
            </svg>
          </span>
        </a>

        <h1
          className="hero-heading"
          ref={headingRef}
          onPointerMove={moveHeading}
          onPointerLeave={resetHeading}
        >
          <span>Portfolio</span>
          <em>de Kawtar</em>
        </h1>

        <VideoRail active={heroVisible} />

        <div className="hero-bottom">
          <span>Portfolio Â· 2026</span>
          <span>Move your cursor</span>
        </div>
      </section>

      <section className="bag-section" id="work" ref={bagRef}>
        <div className="bag-title">
          <strong>WHAT&apos;S IN</strong>
          <em>My bag</em>
        </div>

        <div className="bag-labels" aria-label="MatÃ©riel de Kawtar">
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
          <em>Me</em>
        </div>

        <article className="trait-description" key={activeTrait.id} aria-live="polite">
          <h3>{activeTrait.label}</h3>
          <p>{activeTrait.description}</p>
        </article>

        <div className="about-character" aria-hidden="true">
          <img src={asset('/3D_glb_optimized/kaw.png')} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="trait-list" aria-label="Les qualitÃ©s de Kawtar">
          {personalityTraits.map((trait) => (
            <button
              className={`trait-pill trait-pill-${trait.id}${selectedTrait === trait.id ? ' is-active' : ''}`}
              type="button"
              key={trait.id}
              aria-label={trait.label}
              aria-pressed={selectedTrait === trait.id}
              onClick={() => setSelectedTrait(trait.id)}
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
          <strong>Mon parcours acadÃ©mique ?</strong>
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
              alt="Ticket prÃ©sentant le parcours acadÃ©mique de Kawtar"
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
      </section>

      <ProjectDesktop />
    </main>
  )
}

