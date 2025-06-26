import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Briefcase, ChevronDown, Image } from 'lucide-react'; // Importing icons for signup page
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

// Signup Page Component
const Signup = () => {
    const [username, setUsername] = useState(''); // New state for username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility
    const [avatar, setavatar] = useState(null)
    const [rememberMe, setRememberMe] = useState(false); // Can be kept for signup, or removed if not applicable
    const [role, setRole] = useState('viewer'); // New state for user role
    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault();
        // Handle signup logic here
        if (password !== confirmPassword) {
            console.log('Passwords do not match!');
            // In a real app, you'd show a user-friendly error message
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        if (avatar) {
            formData.append('image', avatar);
        }
        console.log('userData', formData)
        try {
            const response = await axios.post('http://localhost:3000/signup', formData

            )
            if (response.status == 200) {
                const token = response.data.token
                localStorage.setItem('token', token)
                navigate('/dashboard')
                console.log(response.data.message)
            } else {
                console.log("error in submitting")
            }

        } catch (error) {
            console.log(error)

        }
        setUsername('')
        setEmail('')
        setPassword('')
        setRole('')
        setConfirmPassword('')

        console.log('Signup attempt with:', { email, password, confirmPassword, rememberMe });

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100 font-inter p-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    {/* Logo matching the dashboard */}
                    <img src="https://placehold.co/60x60/4f46e5/ffffff?text=VB" alt="Fillow Logo" className="w-16 h-16 rounded-full mb-4" />
                    <h1 className="text-3xl font-bold text-indigo-400">VizionBoard.</h1>
                    <p className="text-gray-400 mt-2">Create your account</p> {/* Changed text */}
                </div>

                <form onSubmit={handleSignUp} className="space-y-6"> {/* Changed onSubmit handler */}
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" aria-hidden="true" /> {/* User icon for username */}
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password" // Changed autocomplete for signup
                                required
                                className="block w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input - New field */}
                    <div>
                        <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                autoComplete="new-password" // Changed autocomplete for signup
                                required
                                className="block w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image" className="sr-only">Avatar URL</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Image className="h-5 w-5 text-gray-400" aria-hidden="true" /> {/* Image icon for avatar */}
                            </div>
                            <input
                                onChange={(e) => { setavatar(e.target.files[0]) }}
                                type="file"
                                id="image"
                                name="image"
                                className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                                placeholder="Enter avatar image"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="role" className="sr-only">Role</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* Changed icon from Mail to Briefcase for role */}
                                <Briefcase className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <select
                                id="role"
                                name="role"
                                required
                                className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm appearance-none"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="viewer" className="bg-gray-700">Viewer</option>
                                <option value="editor" className="bg-gray-700">Editor</option>
                                <option value="admin" className="bg-gray-700">Admin</option>
                            </select>
                            {/* Custom arrow for select dropdown */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <ChevronDown className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    {/* Remember Me checkbox (optional for signup, kept for consistency) */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Remember me
                            </label>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-md"
                        >
                            Sign Up {/* Changed button text */}
                        </button>
                    </div>
                </form>

                {/* Already have an account? Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '} {/* Changed text */}
                        <Link to='/login' className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors duration-200">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
