import React from 'react'
import './Footer.scss'



const Footer = () => {
    const links = {

        'https://github.com/mickmed': <i class="fab fa-github"></i>,
        'https://www.linkedin.com/in/mick-roth/': <i class="fab fa-linkedin"></i>,
        'https://www.facebook.com/mick.roth.1': <i class="fab fa-facebook-square"></i>,
        'https://twitter.com/micky_medium': <i class="fab fa-twitter"></i>,
        // 'https://mail.google.com/mail/?view=cm&fs=1&to=mickrothnyc@gmail.com': <i class="fa fa-envelope" aria-hidden="true" style="background:transparent;font-size:1em;color:rgb(189, 75, 75)'></i>',

    }

    const x = <div>hi</div>
    return (
        <footer>
            <a href='https://mickroth.com'><h4>Mick Roth Portfolio</h4></a>
            {Object.keys(links).map(key => (
                <a href={key} target='_blank'>{links[key]} </a>

            ))}
        </footer>
    )
}
export default Footer 