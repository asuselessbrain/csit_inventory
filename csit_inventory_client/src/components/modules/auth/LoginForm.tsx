export default function LoginForm() {
    return (
        <form className="space-y-5">
            {/* Email Field */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className="
                w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                dark:focus:ring-indigo-400
              "
                />
            </div>

            {/* Password Field */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Password
                    </label>
                    <a
                        href="#"
                        className="
                  text-xs sm:text-sm font-semibold
                  text-indigo-600 dark:text-indigo-400
                  hover:text-indigo-700 dark:hover:text-indigo-300
                  transition-colors
                "
                    >
                        Forgot password?
                    </a>
                </div>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="
                w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                dark:focus:ring-indigo-400
              "
                />
            </div>

            {/* Sign In Button */}
            <button
                type="submit"
                className="
              w-full mt-2 px-6 py-3 rounded-lg
              bg-linear-to-r from-indigo-600 to-blue-600
              hover:from-indigo-700 hover:to-blue-700
              text-white font-semibold text-base
              transition-all duration-200 transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              dark:focus:ring-offset-slate-900
              shadow-lg hover:shadow-xl active:scale-95
              cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            "
            >
                Sign In
            </button>
        </form>
    )
}
