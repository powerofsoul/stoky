import { User } from '@prisma/client'
import React, { useState } from 'react'

import { toast } from 'react-toastify'
import { BrandFacebook, BrandPatreon, BrandTwitter, BrandYoutube } from 'tabler-icons-react'
import { post } from '../../Api'
import Avatar from '../Avatar'

interface Props {
    user: User
    followers?: {
        picture: string | null
        username: string | null
    }[]
    showFollowButton?: boolean
    isFollowing?: boolean
}

const Profile = ({ user, followers, showFollowButton, isFollowing }: Props) => {
    const [isFollowingState, setIsFollowingState] = useState(isFollowing)
    const [followerCount, setFollowerCount] = useState(followers?.length ?? 0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const followAction = async () => {
        if (!isFollowingState) {
            setIsSubmitting(true)

            await post(`profile/${user.username}/follow`, { userToFollowId: user.id })
            toast(`You are now following ${user.username}`, {
                type: 'success',
            })

            setIsFollowingState(!isFollowingState)
            setFollowerCount(followerCount + 1)
            setIsSubmitting(false)
        } else {
            setIsSubmitting(true)

            await post(`profile/${user.username}/unfollow`, { userToFollowId: user.id })
            toast(`You are now not following ${user.username}`, {
                type: 'success',
            })

            setIsFollowingState(!isFollowingState)
            setFollowerCount(followerCount - 1)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="card card-profile">
            <div className="card-header" />
            <div className="card-body text-center">
                <Avatar className="card-profile-img" imgHref={user.picture} size="xl" username={user.username} />
                <h3 className="h3 mt-0 mb-4 mb-3">
                    {user.firstName} {user.lastName}
                </h3>
                <small>@{user.username}</small>
                <p className="mb-4">{user.aboutMe}</p>
                {followers && (
                    <div>
                        Followed by {followerCount} member{followerCount === 1 ? '' : 's'}
                    </div>
                )}
                {showFollowButton && (
                    <button
                        type="button"
                        onClick={followAction}
                        className="btn btn-primary mt-3"
                        disabled={isSubmitting}
                    >
                        {isFollowingState ? 'Unfollow' : 'Follow'}
                    </button>
                )}
                {/* TEMPORARY DISABLE SOCIAL MEDIA BUTTONS */}
                {false && (
                    <ul className="list list-inline social-links">
                        <li className="list-inline-item">
                            <BrandTwitter />
                        </li>
                        <li className="list-inline-item">
                            <BrandFacebook />
                        </li>
                        <li className="list-inline-item">
                            <BrandYoutube />
                        </li>
                        <li className="list-inline-item">
                            <BrandPatreon />
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Profile
