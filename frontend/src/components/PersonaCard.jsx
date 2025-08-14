import { motion } from "framer-motion";

const PersonaCard = ({ name, description, avatar, gradient, onClick, socialLinks }) => {
    const getSocialIcon = (platform) => {
        switch (platform) {
            case 'youtube': return '▶️';
            case 'twitter': return '𝕏';
            case 'github': return '⎔';
            default: return '🔗';
        }
    };

    return (
        <motion.div
            className="group relative"
            onClick={onClick}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-xl blur-md" />

            <div className="relative h-full bg-zinc-800 p-8 rounded-xl border border-zinc-700 overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    {/* Avatar with animated border */}
                    <div className="relative">
                        <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${gradient} opacity-70 group-hover:opacity-100 blur-md transition-all duration-500`} />
                        <img
                            src={avatar}
                            alt={name}
                            className="relative w-24 h-24 rounded-full object-cover border-2 border-zinc-700 group-hover:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Name and description */}
                    <div className="space-y-3">
                        <motion.h3
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                            whileHover={{ scale: 1.02 }}
                        >
                            {name}
                        </motion.h3>
                        <p className="text-zinc-400 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Social links */}
                    <div className="flex space-x-4">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors"
                                whileHover={{ y: -2, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="text-sm">{getSocialIcon(link.platform)}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PersonaCard;