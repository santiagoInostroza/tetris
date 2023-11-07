import { ISPRODUCTION, ISDESKTOP } from './consts'

export function getBgImg(theme){

    if(ISPRODUCTION){
        if(ISDESKTOP){
            return `url("https://raw.githubusercontent.com/santiagoinostroza/tetris/main/img/${theme}/bg.avif")`
        }else{
           return `url('https://raw.githubusercontent.com/santiagoinostroza/tetris/main/img/${theme}/bg_movil.avif')`
        }
    }else{
        if(ISDESKTOP){
            return `url("./img/${theme}/bg.avif")`
        }else{
            return `url('./img/${theme}/bg_movil.avif')`
        }
    }


   
}