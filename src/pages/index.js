import React, { useEffect } from "react"
import anime from 'animejs'
import { Link } from 'gatsby'
import { Container } from 'reactstrap'
import { SittingSvg } from '../components/SVG/Index'
import { Layout, Footer, SEO } from "../components/Index"

const animeIMG = require('../images/1073171.jpg')
const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const IndexPage = (props) => {

  useEffect(() => {
    cubeAnime()

    anime({
      targets: '#maintitle',
      translateX: [-1000, 0],
      duration: 2000
    });

  }, [])

  return (
    <Layout navigate={props.navigate} navbarColor={'transparent'} noFooter={true} noLoading={true}>
      <SEO title="Home" />
      <div className='position-absolute w-100'>
        <div className="bg-wrap">

          <div className='vh-100 d-flex align-items-center'>
            <div className='h1-custom' id='maintitle' style={{}}>
              Stream<br />Download<br />Repeat ~
                    <h6 className='mt-3'>ストリーム, ダウンロード , 繰り返す~</h6>
            </div>
            <div className="gooey-rec one"></div>
            <div className="gooey-rec"></div>
          </div>

          <Container className='mb-5'>
            <div className='row d-flex mb-5'>
              <div className='col-md-auto d-flex justify-content-center'>
                <div>
                  <h1 className="font-weight-bold pb-3 title mb-0">ストリーム<strong className='text-main'>.</strong></h1>
                  <h6 className='title' style={{ marginTop: '-20px' }}>Sutorīmu</h6>
                  <div className="svg-cont">
                    <svg className='cube-svg' viewBox="0 0 615.23 443.15">
                      <g id="shadow">
                        <polygon id="shadow-2" data-name="shadow" className="cls-1"
                          points="307.15 80.38 614.19 266.7 307.05 443.15 0 256.83 307.15 80.38" />
                      </g>
                      <g id="platform-cont">
                        <g id="platform">
                          <polygon className="cls-2"
                            points="308.08 362.76 307.09 403.11 0.05 216.79 1.04 176.45 308.08 362.76" />
                          <polygon className="cls-3"
                            points="615.23 186.32 614.24 226.66 307.09 403.11 308.08 362.76 615.23 186.32" />
                          <polygon className="cls-4" points="308.19 0 615.23 186.32 308.08 362.76 1.04 176.45 308.19 0" />
                        </g>
                        <polygon id="Square" className="cls-5"
                          points="307.13 56.82 517.99 184.77 307.06 305.94 96.2 178 307.13 56.82" />
                        <polygon id="Triangle" className="cls-6"
                          points="307.13 56.82 517.99 184.77 195.2 238.07 195.2 238.07 307.13 56.82" />
                        <polygon id="Pause-right" className="cls-7"
                          points="307.13 56.82 517.99 184.77 448.15 224.89 237.29 96.94 307.13 56.82" />
                        <polygon id="Pause-left" className="cls-7"
                          points="166.04 137.87 376.9 265.82 307.06 305.94 96.2 178 166.04 137.87" />
                        <polygon id="Line-left" className="cls-7"
                          points="96.2 178 307.06 305.94 307.06 305.94 96.2 178 96.2 178" />
                        <polygon id="Next-right" className="cls-8"
                          points="307.13 56.82 517.99 184.77 227.65 216.51 227.65 216.51 307.13 56.82" />
                        <polygon id="Next-left" className="cls-8"
                          points="131.12 157.93 341.98 285.88 307.06 305.94 96.2 178 131.12 157.93" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='col-md my-auto px-5'>
                <h1 className='font-weight-bold'>Dah Nonton Berapa Season Hari Ini?</h1>
                <h5>Yuk nonton terus di jojinime, streaming tanpa buffer dengan server google cloud platform.</h5>
                <Link className='btn btn-main mt-3 px-3' to={ROUTES.COMBINEDLIST}>Anime List</Link>
              </div>
            </div>
          </Container>

          <Container fluid={true} className='mt-5'>
            <div className='row'>
              <div className='col-md d-flex'>
                <div className='m-auto'>
                  <h4 className='mb-0'>Okaerinasai Senpai!</h4>
                  <h4 className='mb-0'>おかえりなさい せんぱい!</h4>
                  <h1 className='font-weight-bold'>Daftar dan Login Sekarang!</h1>
                  <h6>Login untuk menggunakan fitur - fitur lain seperti anime favorit, warna tema, dan lain - lain.</h6>
                  <div className='d-flex flex-wrap'>
                    <Link className='btn btn-main' to={ROUTES.LOGINUSER}>Login Sekarang!</Link>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <SittingSvg defaultSize={true} />
              </div>
            </div>
          </Container>

        </div>
        <Footer />

      </div>
    </Layout>
  )
}

export default IndexPage

var cubeAnime = () => {
  const timeline_plat = anime.timeline({
    loop: true
  });

  timeline_plat
    .add({
      targets: ["#platform-cont", ".title"],
      translateY: 40,
      easing: "easeInExpo",
      duration: 1980,
      delay: (el, i) => 10 + 10 * i
    })
    .add({
      duration: 1980,
      targets: ["#platform-cont", ".title"],
      translateY: 0,
      easing: "easeOutExpo",
      delay: (el, i) => 10 + 10 * i
    });

  // Wrap every letter in a span
  var textWrapper = document.querySelector(".title");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span className='letter'>$&</span>"
  );

  const timeline = anime.timeline({
    loop: true
  });

  timeline
    .add({
      targets: ".title .letter",
      translateX: [0, -40],
      translateZ: 0,
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1320,
      delay: (el, i) => 360 + 20 * i,
      scale: [1, 0.2]
    })
    .add({
      targets: ".title .letter",
      translateX: [0, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1520,
      delay: (el, i) => 160 + 20 * i,
      scale: [0.2, 1]
    });

  const timeline_onPlat = anime.timeline({
    loop: true,
    easing: "easeInExpo"
  });

  const square = "307.13 56.82 517.99 184.77 307.06 305.94 96.2 178 307.13 56.82";
  const triangle =
    "307.13 56.82 517.99 184.77 195.2 238.07 195.2 238.07 307.13 56.82";
  const pause_right =
    "307.13 56.82 517.99 184.77 448.15 224.89 237.29 96.94 307.13 56.82";
  const pause_left =
    "165.77 138.03 376.63 265.98 307.06 305.94 96.2 178 165.77 138.03";
  const next_right =
    "307.13 56.82 517.99 184.77 227.65 216.51 227.65 216.51 307.13 56.82";
  const next_left =
    "131.12 157.93 341.98 285.88 307.06 305.94 96.2 178 131.12 157.93";

  timeline_onPlat
    .add({
      targets: "#Square",
      points: [
        { value: triangle },
        { value: pause_right },
        { value: next_right },
        { value: square }
      ],
      duration: 4000
    })
    .add(
      {
        targets: "#Line-left",
        points: [{ value: pause_left }, { value: next_left }, { value: square }],
        duration: 3000
      },
      "-=3000"
    );

}