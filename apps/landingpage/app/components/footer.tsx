import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-white dark:bg-gray-800 w-full py-8">
            <div className="max-w-[89rem] mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center justify-center md:justify-start">
                <div className="font-4xl">
                  
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-2">© 2024 Emma. All rights reserved</p>
                </div>
                <div className="flex mt-4 md:mt-0">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 ml-4">Privacy</a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 ml-4">Terms</a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 ml-4">Contact</a>
                </div>
            </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer