import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { signIn } from 'next-auth/react'

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
        // Bootstrap core JS
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        // Core theme JS
        <script src="static/js/scripts.js"></script>
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
                          <h1 className="text-white mx-auto my-0 text-uppercase">Curatrix</h1>
                          <img className="img-center img-resize-logo" src="/img/for_Spotify.png" alt="for Spotify" />
                          <h6 className="text-white mx-auto mt-2 mb-5 fw-lighter fst-italic">created by lazy listeners<br/>
                                                                                                for lazy listeners</h6>
                          <button className="btn btn-primary" onClick={() => signIn("spotify")}>Get Started</button>
                      </div>
                  </div>
              </div>
          </header>
          <section className="about-section text-center" id="about">
              <div className="container px-4 px-lg-5">
                  <div className="row gx-4 gx-lg-5 justify-content-center">
                      <div className="col-lg-8">
                          <h2 className="text-white mb-4">Built with Bootstrap 5</h2>
                          <p className="text-white-50">
                              Grayscale is a free Bootstrap theme created by Start Bootstrap. It can be yours right now, simply download the template
                              on <a href="https://startbootstrap.com/theme/grayscale/">the preview page.</a> The
                              theme is open source, and you can use it for any purpose, personal or commercial.
                          </p>
                      </div>
                  </div>
                  <img className="img-fluid" src="img/ipad.png" alt="..." />
              </div>
          </section>
          <section className="projects-section bg-light" id="projects">
              <div className="container px-4 px-lg-5">
                  <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                      <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src="img/bg-masthead.jpg" alt="..." /></div>
                      <div className="col-xl-4 col-lg-5">
                          <div className="featured-text text-center text-lg-left">
                              <h4>Shoreline</h4>
                              <p className="text-black-50 mb-0">Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!</p>
                          </div>
                      </div>
                  </div>
                  <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
                      <div className="col-lg-6"><img className="img-fluid" src="img/demo-image-01.jpg" alt="..." /></div>
                      <div className="col-lg-6">
                          <div className="bg-black text-center h-100 project">
                              <div className="d-flex h-100">
                                  <div className="project-text w-100 my-auto text-center text-lg-left">
                                      <h4 className="text-white">Misty</h4>
                                      <p className="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                                      <hr className="d-none d-lg-block mb-0 ms-0" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row gx-0 justify-content-center">
                      <div className="col-lg-6"><img className="img-fluid" src="img/demo-image-02.jpg" alt="..." /></div>
                      <div className="col-lg-6 order-lg-first">
                          <div className="bg-black text-center h-100 project">
                              <div className="d-flex h-100">
                                  <div className="project-text w-100 my-auto text-center text-lg-right">
                                      <h4 className="text-white">Mountains</h4>
                                      <p className="mb-0 text-white-50">Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                                      <hr className="d-none d-lg-block mb-0 me-0" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <section className="contact-section bg-black">
              <div className="container px-4 px-lg-5">
                  <div className="row gx-4 gx-lg-5">
                      <div className="col-md-4 mb-3 mb-md-0">
                          <div className="card py-4 h-100">
                              <div className="card-body text-center">
                                  <i className="fab fa-spotify text-primary mb-2"></i>
                                  <h4 className="text-uppercase m-0">Spotify</h4>
                                  <hr className="my-4 mx-auto" />
                                  <div className="small text-black-50"><a href="https://open.spotify.com/user/kai.lani">kai.lani</a></div>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                          <div className="card py-4 h-100">
                              <div className="card-body text-center">
                                  <i className="fas fa-envelope text-primary mb-2"></i>
                                  <h4 className="text-uppercase m-0">Email</h4>
                                  <hr className="my-4 mx-auto" />
                                  <div className="small text-black-50">
                                    <div className="text-decoration-none">
                                      <a href="mailto:kailanimila@gmail.com">kailanimila@gmail.com</a>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                          <div className="card py-4 h-100">
                              <div className="card-body text-center">
                                  <i className="fas fa-code text-primary mb-2"></i>
                                  <h4 className="text-uppercase m-0">Source Code</h4>
                                  <hr className="my-4 mx-auto" />
                                  <div className="small text-black-50">
                                    <a href="!#">Curatrix for Spotify</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="social d-flex justify-content-center">
                      <a className="mx-2" href="https://www.instagram.com/kai.lani/"><i className="fab fa-instagram"></i></a>
                      <a className="mx-2" href="https://www.linkedin.com/in/kailani-woodard/"><i className="fab fa-linkedin"></i></a>
                      <a className="mx-2" href="https://github.com/kailaniwoodard"><i className="fab fa-github"></i></a>
                  </div>
              </div>
          </section>
        </body>
      </main>
      <footer className="footer bg-black small text-center text-white-50"><div className="container px-4 px-lg-5">Copyright &copy; Curatrix for Spotify 2022</div></footer>
    </div>
  )
}
