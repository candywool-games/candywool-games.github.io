import { ReactNode } from "react";

declare module 'react-mutation-observer' {
    export function WatchForChildrenAddition(props: Props): JSX.Element

    export interface Props {
        children: ReactNode;
        onAddition: () => void;
    }
}
