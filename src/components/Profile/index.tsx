import { User } from '@prisma/client'
import React from 'react'
import { BrandFacebook, BrandPatreon, BrandTwitter, BrandYoutube } from 'tabler-icons-react'

const Profile = ({ user }: { user: User }) => {
    return (
        <div>
            <div className="card card-profile">
                <div className="card-header" />
                <div className="card-body text-center">
                    {user.picture && <img className="card-profile-img" alt="Profile" src={user.picture} />}
                    <h3 className="h3 mt-0 mb-4 mb-3">
                        {user.firstName} {user.lastName}
                    </h3>
                    <small>{user.username}</small>
                    <p className="mb-4">{user.aboutMe}</p>
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
        </div>
    )
}

export default Profile
