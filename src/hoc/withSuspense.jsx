import React, {Suspense} from "react";

export const withSuspense = (Component) => (props) => {
    return (
        <Suspense fallback={<div/>}>
            <Component {...props}/>
        </Suspense>
    )
}