import React from "react"

export const Mark = ({keyword, name}: {keyword: string, name: string}) => {
  if (!keyword) {
    return <>{name}</>
  }
  const arr = name.split(keyword)
  return <>
    {
      arr.map((str: string, index: number) => <span key={index}>
        {str}
        {
          index === arr.length - 1 ? null : <i style={{color: 'red'}}>{keyword}</i>
        }
      </span>)
    }
  </>
}