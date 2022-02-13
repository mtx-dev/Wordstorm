import { useEffect } from "react";

function useAsyncEffect(
        effect:() => void, 
        destroy?: any[] | (() => void), 
        dependencies?: any[]
    ) {

    const hasDestroy = typeof destroy === 'function';
    useEffect(function () {
        effect();
        return hasDestroy ? destroy : undefined;
    }, hasDestroy ? dependencies : destroy );
  }

export default useAsyncEffect;