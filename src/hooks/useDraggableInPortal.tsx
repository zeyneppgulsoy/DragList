import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const useDraggableInPortal = () => {
    const self = useRef<{elt?: HTMLDivElement}>({}).current;

    useEffect(() => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.pointerEvents = 'none';
        div.style.top = '0';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.zIndex = '99999';
        self.elt = div;
        document.body.appendChild(div);
        return () => {
            if (self.elt) {
                document.body.removeChild(self.elt);
            }
        };
    }, [self]);

    return (render: any) => (provided: any, ...args: any[]) => {
        const element = render(provided, ...args);
        if (provided.draggableProps.style?.position === 'fixed') {
            return createPortal(element, self.elt!);
        }
        return element;
    };
};

export default useDraggableInPortal; 