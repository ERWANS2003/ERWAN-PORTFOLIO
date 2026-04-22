import React from "react";
import projectPatronyms from '../assets/images/project_patronymes.png';
import projectHotel from '../assets/images/project_hotel.png';
import projectPdi from '../assets/images/project_pdi.png';
import '../assets/styles/Project.scss';

function Project() {
    return (
        <div className="projects-container" id="projects">
            <h1>Projets</h1>
            <div className="projects-grid">
                <div className="project">
                    <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><img src={projectPatronyms} className="zoom" alt="thumbnail" width="100%" /></a>
                    <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><h2>Répertoire des Patronymes du Burkina Faso</h2></a>
                    <p>Plateforme web de répertoire des patronymes du Burkina Faso. Développement backend avec Laravel, gestion de base de données, modélisation UML et documentation technique complète.</p>
                </div>
                <div className="project">
                    <a href="https://faso-indaba.com/home" target="_blank" rel="noreferrer"><img src={projectPdi} className="zoom" alt="thumbnail" width="100%" /></a>
                    <a href="https://faso-indaba.com/home" target="_blank" rel="noreferrer"><h2>INDABA International</h2></a>
                    <p>Site vitrine de la sociéte socio-politique INDABA International .</p>
                </div>
                <div className="project">
                    <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><img src={projectHotel} className="zoom" alt="thumbnail" width="100%" /></a>
                    <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><h2>Système de Gestion Hôtelière</h2></a>
                    <p>Application web complète de gestion hôtelière avec authentification, gestion des chambres, réservations et reporting. Développé avec PHP & MySQL.</p>
                </div>
                <div className="project">
                    <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><img src={projectPdi} className="zoom" alt="thumbnail" width="100%" /></a>
                    <a href="https://github.com/ERWANS2003" target="_blank" rel="noreferrer"><h2>Gestion des Personnes Déplacées Internes</h2></a>
                    <p>Système de gestion des PDI (Personnes Déplacées Internes). Analyse, conception et développement complet incluant présentation finale et rapport technique.</p>
                </div>
            </div>
        </div>
    );
}

export default Project;