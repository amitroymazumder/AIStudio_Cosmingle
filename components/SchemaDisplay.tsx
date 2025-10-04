import React from 'react';

const sqlSchema = `
-- Supabase requires the pgcrypto extension for uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- users table: Handled by Supabase Auth, but this is a conceptual equivalent.
-- Supabase uses a table in the 'auth' schema called 'users'.
CREATE TABLE users (
    id UUID PRIMARY KEY, -- References auth.users(id)
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- profiles table: Public user profiles with astrological data
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL CHECK (username ~ '^[a-zA-Z0-9_]{3,20}$'),
    full_name VARCHAR(100),
    birth_date DATE NOT NULL,
    birth_time TIME,
    birth_place VARCHAR(255),
    sun_sign VARCHAR(20) NOT NULL,
    moon_sign VARCHAR(20),
    rising_sign VARCHAR(20),
    bio TEXT,
    avatar_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- posts table: Social feed content
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- likes table: Tracks likes on posts
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, post_id) -- A user can only like a post once
);

-- comments table: Tracks comments on posts
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- follows table: Represents the social graph
CREATE TABLE follows (
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id), -- Ensures a unique follow relationship
    CHECK (follower_id <> following_id) -- Prevent users from following themselves
);

-- notifications table
CREATE TYPE notification_type AS ENUM ('like', 'comment', 'follow');
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- The user who receives the notification
    type notification_type NOT NULL,
    source_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- The user who triggered it
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE, -- Optional, for like/comment notifications
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- compatibility_scores table: Caches compatibility calculations
CREATE TABLE compatibility_scores (
    user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score INT NOT NULL CHECK (score >= 0 AND score <= 100),
    aspects JSONB, -- Store detailed report from AI
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user1_id, user2_id),
    CHECK (user1_id < user2_id) -- Ensures pair uniqueness and avoids duplicates like (A,B) and (B,A)
);

-- Indexes for performance
CREATE INDEX ON posts (user_id);
CREATE INDEX ON likes (post_id);
CREATE INDEX ON comments (post_id);
CREATE INDEX ON follows (following_id);
CREATE INDEX ON notifications (user_id);
`;

interface SchemaDisplayProps {
    onClose: () => void;
}

export const SchemaDisplay: React.FC<SchemaDisplayProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-indigo-300">Cosmingle Database Schema (PostgreSQL)</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                <div className="overflow-auto p-4">
                    <pre className="bg-slate-950 p-4 rounded-md text-sm text-cyan-300 overflow-x-auto">
                        <code>
                            {sqlSchema.trim()}
                        </code>
                    </pre>
                </div>
                 <div className="p-4 border-t border-slate-700 text-right">
                     <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 transition-colors"
                     >
                         Close
                     </button>
                 </div>
            </div>
        </div>
    );
};
