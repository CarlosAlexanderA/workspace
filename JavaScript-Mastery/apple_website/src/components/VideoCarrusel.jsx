import {useEffect, useRef, useState} from 'react';
import {hightlightsSlides} from '../constants';
import gsap from 'gsap';
import {pauseImg, playImg, replayImg} from '../utils';
import {useGSAP} from '@gsap/react';

const VideoCarrusel = () => {
  // referencias al video , span y div del DOM
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // info del estado actual de reproduccion del video
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  // guarda datos cargados de los videos
  const [loadedData, setLoadedData] = useState([]);

  const {isEnd, isLastVideo, startPlay, videoId, isPlaying} = video;

  // animacions con GSAP
  useGSAP(() => {
    // desplaza el carrusel al video siguiente con [videoId]
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });
    // inicia la reproduccion del video cuando es enfocado en la pantalla
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({...prev, startPlay: true, isPlaying: true}));
      },
    });
  }, [isEnd, videoId]);

  // pausa o reproduce el video actual basado en el estado "isPlaying"
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);
  // agrega kis datis de metadatos cargados de cada video al estado "loadedData"
  const handleLoadedMetadata = (i, e) => setLoadedData((prev) => [...prev, e]);

  // efecto para animar el progreso del video (la barra)
  useEffect(() => {
    let currentProgress = 0;
    // el array de los la barra de progreso
    let span = videoSpanRef.current;
    if (span[videoId]) {
      //animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // calculamos el progreso de la barra en numeros enteros
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            // cambiamos el progreso actual
            currentProgress = progress;
            //* el width actual lo expandimos y animamos segun la resolucion de pantalla
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 700
                  ? '10vw'
                  : window.innerWidth < 1200
                  ? '10vw'
                  : '4vw',
            });
            // animamos el ancho del span para reflehar el  progreso de reproduccion
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },
        onComplete: () => {
          // los que se completaron se ponen en su tamaño normal (div y span)
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });

            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            });
          }
        },
      });
      // par resetar solo camviamos el id a 0
      if (videoId === 0) {
        anim.restart();
      }
      const animUpdate = () => {
        // Calcula el progreso de la animación dividiendo el tiempo actual del video
        // entre la duración total del video correspondiente
        anim.progress(
          videoRef.current[videoId].currentTime / // Tiempo actual del video
            hightlightsSlides[videoId].videoDuration // Duración total del video
        );
      };

      if (isPlaying) {
        // animUpdate se ejecuta cada tick de la animacion
        gsap.ticker.add(animUpdate);
      } else {
        // detiene la ejecucion de animUpdate
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);
  //* control del proceso del video

  const handleProcess = (type, i) => {
    // ?Cambia el estado del video según el tipo de acción, como avanzar al siguiente video, pausar, reproducir, reiniciar, etc
    switch (type) {
      case 'video-end':
        setVideo((prevVideo) => ({...prevVideo, isEnd: true, videoId: i + 1}));
        break;
      case 'video-last':
        setVideo((prevVideo) => ({...prevVideo, isLastVideo: true}));
        break;
      case 'video-reset':
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case 'play':
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;
      case 'pause':
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center ">
        {/* Renderiza un video por cada elemento en hightlightsSlides */}
        {hightlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  src={list.video}
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${
                    list.id === 2 && 'translate-x-44 '
                  } pointer-events-none`}
                  ref={(el) => (videoRef.current[index] = el)}
                  // Ejecuta cuando el video termina
                  onEnded={
                    () =>
                      index !== 3
                        ? handleProcess('video-end', index) // Maneja el fin del video
                        : handleProcess('video-last') // Si es el último video
                  }
                  // Ejecuta cuando el video empieza a reproducirse
                  onPlay={() => {
                    setVideo((prevVideo) => ({...prevVideo, isPlaying: true})); // Cambia el estado a reproduciendo
                  }}
                  // Ejecuta cuando los metadatos del video son cargados
                  onLoadedMetadata={(e) => handleLoadedMetadata(index, e)} // Almacena datos cargados
                ></video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {/* Renderiza los textos superpuestos en el video */}
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10 ">
        {/* Contenedor de indicadores de progreso de video */}
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full ">
          {videoRef.current.map((_, index) => (
            <div
              key={index}
              ref={(el) => (videoDivRef.current[index] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[index] = el)}
              ></span>
            </div>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            // Controla la reproducción y reseteo del video
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset') // Reinicia al primer video si ha terminado
                : !isPlaying
                ? () => handleProcess('play') // Reproduce el video si está pausado
                : () => handleProcess('pause') // Pausa el video si está reproduciendo
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarrusel;
