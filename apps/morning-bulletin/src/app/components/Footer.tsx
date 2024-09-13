import { IconContext } from 'react-icons'
import styled from 'styled-components'
import { BiLogoLinkedin, BiLogoFacebook, BiLogoInstagram } from 'react-icons/bi'
import { FaXTwitter } from 'react-icons/fa6'
import { BulletinButton } from '../styles/shared'

export const Footer = () => {
    return (
        <FooterContainer>
            <NewsletterWrapper>
                <NewsletterHeroText>
                    <h2>Stay Up To Date</h2>
                    <h3>
                        Get the news first by <span>subscribing</span> to our
                        newsletter
                    </h3>
                </NewsletterHeroText>
                <NewsletterSignupForm>
                    <input placeholder="Email" />
                    <BulletinButton>Subscribe</BulletinButton>
                </NewsletterSignupForm>
            </NewsletterWrapper>
            <FooterBottomContainer>
                <BrandSocialContainer>
                    <div>
                        <h1>Bulletin</h1>
                        <FooterBottomTitleWrap>
                            Crafting narratives that ignite inspiration,
                            knowledge and entertainment.
                        </FooterBottomTitleWrap>
                        <FooterSocialLinksListStyle>
                            <IconContext.Provider
                                value={{ className: 'socialIcons' }}
                            >
                                <li>
                                    <BiLogoFacebook />
                                </li>
                                <li>
                                    <FaXTwitter />
                                </li>
                                <li>
                                    <BiLogoInstagram />
                                </li>
                                <li>
                                    <BiLogoLinkedin />
                                </li>
                            </IconContext.Provider>
                        </FooterSocialLinksListStyle>
                    </div>
                    <small>Copyright © 2023 Bulletin</small>
                </BrandSocialContainer>
                <FooterLinkContainer>
                    <>
                        <FooterMenuListStyle>
                            <li>Business</li>
                            <li>Startup</li>
                            <li>Employee</li>
                            <li>Success</li>
                            <li>Videos</li>
                            <li>Markets</li>
                        </FooterMenuListStyle>
                        <FooterMenuListStyle>
                            <li>Technology</li>
                            <li>Innovate</li>
                            <li>Gadget</li>
                            <li>Innovative Cities</li>
                            <li>Upstarts</li>
                            <li>Future Tech</li>
                        </FooterMenuListStyle>
                        <FooterMenuListStyle>
                            <li>Travel</li>
                            <li>Destinations</li>
                            <li>Food & Drink</li>
                            <li>Stay</li>
                            <li>News</li>
                            <li>Videos</li>
                        </FooterMenuListStyle>
                        <FooterMenuListStyle>
                            <li>Sports</li>
                            <li>Football</li>
                            <li>Tennis</li>
                            <li>Golf</li>
                            <li>Motorsports</li>
                            <li>AFL</li>
                        </FooterMenuListStyle>
                        <FooterMenuListStyle>
                            <li>Entertainment</li>
                            <li>Movies</li>
                            <li>Art</li>
                            <li>TV</li>
                            <li>Influencers</li>
                            <li>Viral</li>
                        </FooterMenuListStyle>
                        <FooterMenuListStyle>
                            <li>Features</li>
                            <li>As Equals</li>
                            <li>Call to Earth</li>
                            <li>Freedom Project</li>
                            <li>Inside Asia</li>
                            <li>2 Degress</li>
                        </FooterMenuListStyle>
                        <FooterMenuListStyle>
                            <li>Weather</li>
                            <li>Climate</li>
                            <li>Storm Tracker</li>
                            <li>Wildlife Tracker</li>
                            <li>Earthquakes</li>
                            <li>Videos</li>
                        </FooterMenuListStyle>
                        <FooterMenuListStyle>
                            <li>More</li>
                            <li>About Us</li>
                            <li>Mentorship</li>
                            <li>Investment</li>
                            <li>Careers</li>
                            <li>Support Us</li>
                        </FooterMenuListStyle>
                    </>
                </FooterLinkContainer>
            </FooterBottomContainer>
        </FooterContainer>
    )
}
const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const NewsletterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    width: 65vw;
`
const NewsletterHeroText = styled.div`
    width: 50%;

    h2 {
        text-transform: uppercase;
        font-size: 16px;
        letter-spacing: 2px;
        padding-bottom: 10px;
        color: #1f1f1f;
    }
    h3 {
        font-size: 24px;
        color: #1f1f1f;
        font-weight: 600;
    }
    span {
        color: #e9353b;
    }
`
const NewsletterSignupForm = styled.div`
    display: flex;
    width: 50%;
    justify-content: flex-end;
    gap: 10px;

    input {
        border-radius: 5px;
        border: 1px solid #434343;
        padding: 10px;
        width: 60%;

        :focus {
            outline: 1px solid #e50914;
        }
    }
`
const FooterBottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 40px;
    width: 65vw;
`
const FooterLinkContainer = styled.div`
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px 20px;
    grid-auto-flow: row;
    grid-template-areas:
        '. . . .'
        '. . . .';
`
const BrandSocialContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    padding-bottom: 20px;

    h1 {
        font-size: 20px;
        color: #e9353b;
        font-family: 'Noto Serif', serif;
    }
    small {
        font-size: 11px;
        color: #434343;
        position: relative;
        bottom: 0;
    }
`
const FooterBottomTitleWrap = styled.div`
    font-size: 12px;
    padding: 10px 20px 10px 0;
`
const FooterMenuListStyle = styled.ul`
    list-style: none;
    font-size: 12px;
    padding: 6px;

    li {
        padding-bottom: 10px;
        color: #434343;
        :first-of-type {
            font-size: 16px;
            font-weight: 600;
            padding-bottom: 8px;
            color: #000;
        }
    }
    li:hover {
        text-decoration: underline;
        cursor: pointer;
        transition: all 0.2s ease;
        :first-of-type {
            text-decoration: none;
            cursor: default;
        }
    }
`
const FooterSocialLinksListStyle = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    width: 80%;
    padding: 10px 0;
    .socialIcons {
        background-color: #e9353b;
        fill: #f5f5f5;
        border-radius: 50%;
        padding: 2px;
        height: 60%;
        width: 60%;
    }
    li {
        display: grid;
        place-items: center;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        box-shadow: 0 2px 5px #cccccc9c;
    }
    li:hover {
        cursor: pointer;
        .socialIcons {
            fill: #e9353b;
            background: #f5f5f5;
            transition: all 0.3s linear;
        }
    }
`
