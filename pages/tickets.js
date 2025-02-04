import Link from 'next/link'

import BaseLayout from '../components/BaseLayout'
import List from '../components/List'
import { getListData } from '../lib/lists'
const { basePublicPath } = require('../next.config')


import styles from '../styles/tickets.module.css'


export async function getStaticProps() {
const listData = await getListData('tickets')  
const ticketPackageData = [
  {
    "title": "Opening Night with Reception",
    "subtitle": "March 24",
    "general_price": 15,
    "student_price": 10,
    "btn_url": "https://carnegiemellontickets.universitytickets.com/w/event.aspx?id=2155",
    "ticket_btn": "Buy Opening Night Ticket 🡕",
    "instructions": "Select the 'Opening Night General Admission - March 24th' option"
  },
  {
    "title": "Regular Film Screening",
    "subtitle": "",
    "general_price": 10,
    "student_price": 5,
    "btn_url": "#regular-tickets",
    "ticket_btn": "Buy Regular Tickets",
    "instructions": "View options below"
  },
  {
    "title": "Festival Pass",
    "subtitle": "(does not include opening night event)",
    "general_price": 50,
    "student_price": 25,
    "btn_url": "https://carnegiemellontickets.universitytickets.com/w/event.aspx?id=2155",
    "ticket_btn": "Buy Festival Pass 🡕",
    "instructions": "Select the 'Film Festival Pass' option"

  }
]
return {
    props: {
      listData,
      ticketPackageData
    }
  }
}

// function Item(entry) {

//   return (
//     <div className={styles.ticketContainer}>
//     <div className={styles.ticketHeaderContainer}>
//     <h4><Link href={`/films/${entry.filmId}`}><a>{entry.name}</a></Link></h4>
//     <p className={styles.caption}>{entry.caption}</p>
//     </div>
//     <div className={styles.imageContainer}>
//       <img 
//       src={`${basePublicPath}/assets/films${entry.src || "/placeholder.png"}`}
//       alt={`${entry.name} film poster`}
//       />      
//     </div>
//     <div className={styles.aboutContainer}>
//       <p>{entry.description}</p>
//     </div>
//     </div>
//     );
// }

function Item(entry) {

  if (!entry.ticket_url) {
    return (
    <div className={styles.ticketContainer} id={entry.filmId}>
    <div>
    <h5>{entry.name}</h5>
    <p>{entry.screening_location}<br />{entry.screening_time}
    <br /><i>Tickets to be released.</i></p>
    </div>
    <div>
    <Link href={`/films/${entry.filmId}`}><a><button className="btn btn-light">About the Film</button></a></Link>
    <Link href='#'><a><button className="btn btn-light" disabled>Buy Regular Ticket</button></a></Link>
    </div>
    </div>
    );
  }
  return (
    <div className={styles.ticketContainer} id={entry.filmId}>
    <div>
    <h5>{entry.name}</h5>
    <p>{entry.screening_location}<br />{entry.screening_time}</p>
    </div>
    <div>
    <Link href={`/films/${entry.filmId}`}><a><button className="btn btn-light">About the Film</button></a></Link>
    <Link href={entry.ticket_url}><a><button className="btn btn-light">Buy Regular Ticket</button></a></Link>
    </div>
    </div>
    );
}

function TicketPackageItem(entry) {
  return (
    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${styles.centeredCardContainer}`}>
      
        <h5>{entry.title}</h5>
        <p style={{marginBottom: "0.5rem"}}>{entry.subtitle}</p>
        <hr />
        <h5>${entry.general_price}</h5>
        <p>General Admission</p>
        <h5>${entry.student_price}</h5>
        <p>Students and Seniors*</p>
        <hr />
        <Link href={entry.btn_url}><a><button className="btn btn-bg">{entry.ticket_btn}</button></a></Link>
        <p><i><b>Instructions:</b> {entry.instructions}</i></p>
      </div>)
}

export default function Tickets({ listData, ticketPackageData }) {
  return (
    <BaseLayout title="Tickets">
    <div className="container">
    <h1>2022 Tickets</h1>
    <p>Tickets can be purchased at the door or online through the links below. Festival passes can be purchased through Carnegie Mellon Tickets.</p> 
    </div>
    <div className="container">
    <h2>Pricing</h2>
    <List Item={TicketPackageItem} data={ticketPackageData} emptyText="No ticket packages available" />
    <p>*A valid student/OSHER ID must be presented for discount<br />
    **Opening Night is not included in Festival Pass</p>
    
    </div>
    {/*<div className="container">
    <Link href="/schedule"><a><button className="btn btn-lg btn-light">Festival Schedule</button></a></Link>

    </div>*/}
    <div className="container" id="regular-tickets">
    <h2>2022 Regular Tickets</h2>
    <List Item={Item} data={listData.data} emptyText={<p>No tickets available. <Link href="/schedule"><a>Visit the Schedule page</a></Link></p>} />
    </div>
    {/*<div className="container">
    <h1>2020-2021 Tickets</h1>
    <List Item={Item} data={[]} emptyText={<a href={`${basePublicPath}/previous_festivals/2021home/Tickets/tickets.html`} target="_blank" rel="noreferrer">Visit 2020-2021 Tickets page</a>} />
    </div>*/}
    </BaseLayout>
  )
}