import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Curatrix for Spotify</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Spotify playlist curator by lazy listeners for lazy listeners..." />
        <meta name="author" content="Kai'lani Woodard" />
        <link rel="icon" href="/favicon.ico" />
        // Preloading main body font
        <link
          rel="preload"
          href="/fonts/metropolis/ttf/Metropolis-Regular.ttf"
          as="font"
          crossOrigin="">
        </link>
        // Font Awesome icons (free version)
        <script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
                strategy="lazyOnLoad">
        </script>
      </Head>
      <main>
        <body id="page-top">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
              <div className="container px-4 px-lg-5">
                  <a className="navbar-brand" href="#page-top">Curatrix for Spotify</a>
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                      Menu
                      <i className="fas fa-bars"></i>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                      <ul className="navbar-nav ms-auto">
                          <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                          <li className="nav-item"><a className="nav-link" href="#projects">Projects</a></li>
                      </ul>
                  </div>
              </div>
          </nav>
          <header className="masthead">
              <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                  <div className="d-flex justify-content-center">
                      <div className="text-center">
                          <h1 className="mx-auto my-0 text-uppercase">Curatrix</h1>
                          <img className="img-center img-resize-logo" src="/img/for_Spotify.png" alt="for Spotify" />
                          <h6 className="text-white-50 mx-auto mt-2 mb-5 fw-lighter fst-italic">created by lazy listeners, for lazy listeners</h6>
                          <a className="btn btn-primary" href="#about">Get Started</a>
                      </div>
                  </div>
              </div>
          </header>
        </body>
      </main>
    </div>
  )
}
