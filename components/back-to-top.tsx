import { BsArrowBarUp } from "react-icons/bs";
import { useRef, useEffect } from 'react'
import backToTopStyles from '../styles/back-to-top.module.css'
export default function BackToTop() {
  const btnRef = useRef(null)
  const clickFn = () => window.scrollTo({top: 0, behavior: 'smooth'})

  const show = (flag: boolean) => {
    if(btnRef.current===null) return 

    const button: any = btnRef.current
    if (flag) {
        button.style.opacity = 1
        button.style.pointerEvents = 'auto'
    } else {
        button.style.opacity = 0
        button.style.pointerEvents = 'none'
    }
  }

const setLeft = () => {
    if(btnRef.current===null) return 

    const button: any = btnRef.current
    const btnWidth = button.offsetWidth
    const containerWidth = (document as any).querySelector('.container').offsetWidth
    // const left = (window.innerWidth - containerWidth) / 2 + containerWidth
    // button.style.left = (window.innerWidth - btnWidth) < left ? (window.innerWidth - btnWidth - 30) + 'px' : left + 'px'
    button.style.right = '20px'
    button.style.bottom = '20px'
}

const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
        show(true)
    } else if (scrolled <= 300) {
        show(false)
    }
};

useEffect(() => {

    let timer1: any = null
    let timer2: any = null

    const debounceToggleVisible = () => {
        if (timer1) {
            clearTimeout(timer1)
        }
        timer1 = setTimeout(toggleVisible, 150)
    }
    const debounceSetLeft = () => {
        if (timer2) {
            clearTimeout(timer2)
        }
        timer2 = setTimeout(setLeft, 150)
    }
    setLeft()
    toggleVisible()

    window.addEventListener('resize', debounceSetLeft);
    window.addEventListener('scroll', debounceToggleVisible);

    return () => {            
        window.removeEventListener('resize', debounceSetLeft);
        window.removeEventListener('scroll', debounceToggleVisible);
    }
}, [])

  return <button ref={btnRef} onClick={clickFn}
  className="z-50 fixed md:flex scroll-to-top rounded-full whitespace-nowrap space-x-2 flex-row text-xs items-center uppercase py-2 px-5 text-white bg-blue-600 hover:bg-gray-800 transition">
    <BsArrowBarUp className='w-5 h-5' />
    <span className={backToTopStyles['scroll-text']}>scroll to top</span>
  </button>
}