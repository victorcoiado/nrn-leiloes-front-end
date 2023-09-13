import React from 'react'

const Header = ({ category, title }) => {
  return (
    <div className='mb-10 mt-20'>
      <p className='bg-gray-50 dark:bg-main-dark-bg text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-200'>{title}</p>
      <p className='bg-gray-50 dark:bg-main-dark-bg text-slate-900 dark:text-gray-400'>{category}</p>
    </div>
  )
}

export default Header