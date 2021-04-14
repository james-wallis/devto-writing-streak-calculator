import { FiGithub, FiHelpCircle } from 'react-icons/fi'
import Link from 'next/link'
import IUser from '../interfaces/IUser'

interface IProps {
    user?: IUser
}

const Header = ({ user }: IProps): JSX.Element => {
    const articleUrl = 'https://dev.to/jameswallis/i-made-a-free-dev-to-writing-streak-calculator-that-anyone-can-use-4m07'
    const devToUrl = user ? `https://dev.to/${user.username}` : 'https://dev.to/jameswallis'; // default to me
    const websiteUrl = user ? user.website_url || devToUrl : 'https://wallis.dev';
    return (
        <header className="w-screen bg-white h-header shadow-header">
            <div className="max-w-site m-auto px-2 lg:px-4 h-full flex flex-row items-center justify-between">
                <Link href="/">
                    <a className="flex items-center">
                        <img
                            src="/devto-icon.svg"
                            alt="dev.to logo"
                            className="mr-4 h-full w-auto"
                        />
                        <h1 className="text-lg">
                            <span className="hidden md:inline mr-1">Writing</span>
                            Streak Calculator
                        </h1>
                    </a>
                </Link>
                <div className="flex items-center">
                    <a
                        className="
                            mr-2 hidden md:block rounded-devto text-center py-2 px-4
                            bg-button-primary-bg hover:bg-button-primary-bg-hover
                            text-button-primary-color hover:text-button-primary-color-hover
                            transition-colors font-medium
                        "
                        href={articleUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Read the post
                    </a>
                    <a
                        href={articleUrl}
                        className="mx-1 p-2 rounded-full hover:bg-ghost-light-hover transition-colors"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <FiHelpCircle className="text-2xl text-ghost" />
                    </a>
                    <a
                        href="https://github.com/james-wallis/devto-writing-streak-calculator"
                        className="mx-1 p-2 rounded-full hover:bg-ghost-light-hover transition-colors"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <FiGithub className="text-2xl text-ghost" />
                    </a>
                    <a
                        href={websiteUrl}
                        className="h-8 w-8 mx-3"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {user ? (
                            <img
                                className="h-full w-full rounded-full"
                                src={user ? user.profile_image : ''}
                                alt="User profile"
                            />
                        ): (
                            <div
                                className="h-full w-full rounded-full bg-gray-200"
                            />
                        )}
                    </a>
                </div>
            </div>
        </header>
    )
    }

export default Header