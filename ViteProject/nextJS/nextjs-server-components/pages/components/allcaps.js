"use client";
import React, { useState } from 'react'

export function AllCaps({children}) {
    const [isAllCaps,setIsAllCaps] = useState(false);
    console.log(children)
  return (
    <article>
        <label htmlFor='allCaps'>All Caps?</label>
        <input type="checkbox" id="allcaps" onClick={(event) => setIsAllCaps(event.target.checked)}/>
        <section className={isAllCaps ? "allcaps":""}>
          {children}
        </section>
    </article>
  )
}

