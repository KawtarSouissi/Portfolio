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
    ...makeProjectMedia('RIWAYA', 13, 7),
  },
]

function ProjectDesktop() {
  const [openFolders, setOpenFolders] = useState([])
  const [infoSlides, setInfoSlides] = useState({})
  const [windowPositions, setWindowPositions] = useState({})
  const dragState = useRef(null)
  const [cvOpen, setCvOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)

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
              data="/projects/Green%20Aesthetic%20Creative%20Cv%20Resume%20(1).pdf"
              type="application/pdf"
              aria-label="CV de Kawtar"
            >
              <a href="/projects/Green%20Aesthetic%20Creative%20Cv%20Resume%20(1).pdf" target="_blank" rel="noreferrer">
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
              data="/projects/Lettre%20de%20motivation%20Kawtar%20Souissi.pdf"
              type="application/pdf"
              aria-label="Lettre de motivation de Kawtar"
            >
              <a href="/projects/Lettre%20de%20motivation%20Kawtar%20Souissi.pdf" target="_blank" rel="noreferrer">
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
                    <p>J’AI DÉCIDÉ DE NOMMER MON COMPTE “NAKLO B3DA W I7EN LAH”, UNE EXPRESSION TIRÉE TOUT DROIT DU DIALECTE MAROCAIN, ELLE SIGNIFIE “MANGEONS D’ABORD, DIEU S’OCCUPERA DU RESTE”. C’EST UNE EXPRESSION CÉLÈBRE DANS LA CULTURE MAROCAINE, ELLE PERMETS DE RECENTRER LE SUJET SUR LE PLUS IMPORTANT; LA SIMPLICITÉ DE PARTAGER UN MOMENT DE CONVIVIALITÉ AUTOUR D’UN BON PLAT, ET DE LAISSER LE RESTE AUX MAINS DE DIEU.</p>
                  </section>
                  <section className="naklo-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>ÉTANT FRANCO-MAROCAINE ET GRANDE ADEPTE DE TOUT CE QUI EST RELIÉ DE PRÈS OU DE LOIN À LA NOURRITURE, JE ME DEVAIS DE CRÉER UN CONCEPT QUI PERMETTRAIS À MA COMMUNAUTÉ DE DÉCOUVRIR DE NOUVELLES SPÉCIALITÉS CULINAIRES ET ACTIVITÉS EXISTANTES EN FRANCE ET AU MAROC. OBJECTIF ? PARTAGER UN UNIVERS QUI ME PASSIONNE; PROMOUVOIR L’INCLUSIVITÉ ET L’ACCESSIBILITÉ À TRAVERS LA DÉCOUVERTE DE LIEUX QUI ONT POUR CIBLES TOUT TYPE DE PROFIL CLIENTS. MA SŒUR M’A JOINT DANS CE MAGNIFIQUE PROJET : BIENVENUS DANS NOTRE UNIVERS.</p>
                  </section>
                </>
              ) : project.id === 'ks-modesty' ? (
                <>
                  <img className="ks-info-logo" src={asset("/projects/KSMODESTY/KS_logo.png")} alt="KS Modesty" />
                  <section className="ks-info-text">
                    <h4>CONCEPT &amp; OBJECTIF <em>de ce projet</em></h4>
                    <p>J’AI DÉVELOPPÉ UN PROJET QUI ME RESSEMBLE ET QUI RÉPONDAIT À UN RÉEL BESOIN SUR LE MARCHÉ. KS MODESTY EST UNE MARQUE SPÉCIALISÉE DANS LES VOILES D’EXCEPTION, ET SE DISTINGUE PAR UNE APPROCHE NOVATRICE, LE MESSAGE QUE JE SOUHAITE PASSER EST QU’UNE FEMME QUI FAIS LE CHOIX VESTIMENTAIRE DU VOILE, NE DOIT PAS SE PERDRE DANS LES ATTENTES DE LA SOCIÉTÉ À CE QU’ELLE SE VÊTISSE DE MANIÈRE MONOTONE ET SANS EXTRAVAGANCE. BREF J’EN AI DIS ASSEZ.</p>
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
                    <p>J’AI LANCÉ CE COMPTE DE CRÉATION DE CONTENU ÉVÉNEMENTIEL PARCE QU’IL RÉUNIT TOUT CE QUI ME PASSIONNE : L’ESTHÉTIQUE, LE SENS DU DÉTAIL, LA CRÉATION DE CONTENU ET SURTOUT L’ÉMOTION HUMAINE. J’AIME CAPTURER CES INSTANTS QUI NE SE REPRODUIRONT JAMAIS DEUX FOIS, METTRE EN LUMIÈRE LA BEAUTÉ D’UN MOMENT, D’UN LIEU OU D’UNE HISTOIRE À TRAVERS MON REGARD. CHAQUE ÉVÉNEMENT EST UNE OCCASION DE RACONTER QUELQUE CHOSE D’UNIQUE, DE TRANSFORMER DES SOUVENIRS EN IMAGES ET DE FAIRE RESSENTIR AUX AUTRES UNE ATMOSPHÈRE BIEN PRÉCISE.</p>
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
                <button type="button" className="carousel-arrow carousel-prev" onClick={() => moveInfoSlide(project.id, -1)} aria-label="Média précédent">‹</button>
                <button type="button" className="carousel-arrow carousel-next" onClick={() => moveInfoSlide(project.id, 1)} aria-label="Média suivant">›</button>
              </div>
              <div className="carousel-caption">
                <span>Selected work · {project.name}</span>
                <small>{String(infoSlide + 1).padStart(2, '0')} / {String(project.videos.length).padStart(2, '0')}</small>
              </div>
              <div className="carousel-dots" aria-label="Choisir un média">
                {project.videos.map((media, index) => (
                  <button
                    type="button"
                    key={media.src}
                    className={infoSlide === index ? 'is-active' : ''}
                    onClick={() => setInfoSlides((current) => ({ ...current, [project.id]: index }))}
                    aria-label={`Afficher le média ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        )
      })}

      <div className="desktop-hint">Clique sur un dossier pour l’ouvrir</div>

      <div className="desktop-dock" aria-label="Barre d'applications">
        <span className="dock-finder">◐</span>
        <span className="dock-ps">Ps</span>
        <span className="dock-ai">Ai</span>
        <span className="dock-video">▶</span>
        <span className="dock-notes">▤</span>
        <span className="dock-photos">✿</span>
        <span className="dock-instagram">◎</span>
        <span className="dock-mail">✉</span>
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
  const [loadBagScene, setLoadBagScene] = useState(false)
  const [loadSimsScene, setLoadSimsScene] = useState(false)
  const [loadEducationScene, setLoadEducationScene] = useState(false)
  const [educationVisible, setEducationVisible] = useState(false)
  const [ticketPrinted, setTicketPrinted] = useState(false)
  const [selectedTrait, setSelectedTrait] = useState('amicale')
  const [hoveredTrait, setHoveredTrait] = useState(null)
  const activeTrait = personalityTraits.find((trait) => trait.id === selectedTrait)

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
            fetch('/3D_glb_optimized/tea.glb', { cache: 'force-cache' }).catch(() => {})
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
          aria-label="Découvrir plus d'informations sur Kawtar"
        >
          <img className="portrait-blur" src="/hero.png" alt="Portrait de Kawtar" decoding="async" />
          <img className="portrait-focus" src="/hero.png" alt="" aria-hidden="true" decoding="async" />
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
          <span>Portfolio · 2026</span>
          <span>Move your cursor</span>
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
          <em>Me</em>
        </div>

        <article className="trait-description" key={activeTrait.id} aria-live="polite">
          <h3>{activeTrait.label}</h3>
          <p>{activeTrait.description}</p>
        </article>

        <div className="about-character" aria-hidden="true">
          <img src="/3D_glb_optimized/kaw.png" alt="" loading="lazy" decoding="async" />
        </div>

        <div className="trait-list" aria-label="Les qualités de Kawtar">
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
            >
            </button>
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
      </section>

      <ProjectDesktop />
    </main>
  )
}
