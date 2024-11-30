import {useRef, useState, useEffect} from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';
import clsx from 'clsx';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [LastScrollY, setLastScrollY] = useState(0);
  const [IsNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const {y: currentScrollY} = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > LastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < LastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, LastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
        y: IsNavVisible ? 0 : -100,
        opacity: IsNavVisible ? 1 : 0,
        duration: 0.2,
    })
  }, [IsNavVisible])

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full items-center justify-between p-4'>
                <div className='flex itmes-center gap-7'>
                    <img src='/img/logo.png' alt="logo" className='w-10' />
                    <Button id="product-button" title="Products" rightIcon={<TiLocationArrow />} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1" />
                </div>

                <div className='flex h-full itmes-center'>
                    <div className='hidden md:block'>
                        {navItems.map((item, index) => (
                            <a  key={index}
                                href={`#${item.toLowerCase()}`}
                                className="nav-hover-btn" >
                                    {item}
                            </a>
                        ))}
                    </div>
                    <button
                        onClick={toggleAudioIndicator}
                        className="ml-10 flex items-center space-x-0.5"
                        >
                        <audio
                            ref={audioElementRef}
                            className="hidden"
                            src="/audio/loop.mp3"
                            loop
                        />
                        {[1, 2, 3, 4].map((bar) => (
                            <div
                            key={bar}
                            className={clsx("indicator-line bg-blue-50 p-[2px]", {
                                active: isIndicatorActive,
                            })}
                            style={{
                                animationDelay: `${bar * 0.1}s`,
                            }}
                            />
                        ))}
                    </button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar