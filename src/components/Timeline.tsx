import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Parcours</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="2026 - Présent"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Master Management des SI</h3>
            <h4 className="vertical-timeline-element-subtitle">Université Aube Nouvelle, Ouagadougou</h4>
            <p>
              Management des systèmes d'information
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Juillet - Septembre 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Stagiaire Développeur Web</h3>
            <h4 className="vertical-timeline-element-subtitle">Ministère de la Communication, de la Culture, des Arts et du Tourisme</h4>
            <p>
              Conception d'une plateforme de répertoire des patronymes du Burkina Faso. Analyse des besoins, modélisation UML, développement backend et documentation complète.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2022 - 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Licence en Génie Informatique</h3>
            <h4 className="vertical-timeline-element-subtitle">Université Aube Nouvelle, Ouagadougou</h4>
            <p>
              Génie informatique, développement web et mobile
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Juin 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Développeur - Projet Académique</h3>
            <h4 className="vertical-timeline-element-subtitle">Université Aube Nouvelle</h4>
            <p>
              Système de Gestion Hôtelière : application web complète avec authentification, gestion des chambres, réservations et reporting. PHP & MySQL.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Juillet - Septembre 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Stagiaire - Documentation Logicielle</h3>
            <h4 className="vertical-timeline-element-subtitle">MAS Distribution</h4>
            <p>
              Rédaction et organisation des documentations techniques. Appui à la digitalisation des processus internes.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Juillet - Septembre 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Développeur - Projet Académique</h3>
            <h4 className="vertical-timeline-element-subtitle">Université Aube Nouvelle</h4>
            <p>
              Système de gestion des personnes déplacées internes (PDI). Analyse, conception, développement et rapport technique.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2022"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Formation Intensive d'Anglais</h3>
            <h4 className="vertical-timeline-element-subtitle">Durra Institute, Accra - Ghana</h4>
            <p>
              Formation intensive en langue anglaise
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;