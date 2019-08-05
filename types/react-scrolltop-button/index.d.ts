declare module 'react-scrolltop-button' {
    export default function ScrollTop(props: Props): JSX.Element

    export interface Props {
        text?: string,
        distance?: number,
        breakpoint?: number,
        style?: any,
        className?: string,
        speed?:number,
        target?:number,
        icon?: JSX.Element
    }
}
