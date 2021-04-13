import { useState } from 'react';

interface IProps {
    onSubmit: (username: string) => void
}

const UsernameForm = ({ onSubmit }: IProps) => {
    const [formUsername, setFormUsername] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formUsername)
    }

    return (
        <form onSubmit={handleSubmit} className="lg:w-1/3 md:w-1/2 w-full bg-white rounded-lg p-6 md:p-8 flex flex-col w-full">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-3 md:mb-5">Enter your Dev.to username</h2>
            <div className="relative mb-2 md:mb-4" data-children-count="1">
                <label className="leading-7 text-sm text-gray-600">Username</label>
                <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
            </div>
            <button
                className="
                    text-white border-0 py-2 px-4 md:px-6 focus:outline-none
                    bg-button-primary-bg hover:bg-button-primary-bg-hover
                    text-button-primary-color hover:text-button-primary-color-hover
                    transition-colors rounded md:text-lg mt-2 md:mt-4
                "
            >
                Calculate weekly streak
            </button>
        </form>
    )
}

export default UsernameForm;
