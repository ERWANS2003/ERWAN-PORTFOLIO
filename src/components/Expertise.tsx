import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faLaravel, faPython } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "React",
    "Laravel",
    "JavaScript",
    "PHP",
    "HTML5",
    "CSS3",
    "SASS",
];

const labelsSecond = [
    "Python",
    "Java",
    "C/C++",
    "MySQL",
    "PostgreSQL",
    "SQL",
];

const labelsThird = [
    "Git",
    "GitHub",
    "Windows",
    "Linux",
    "UML",
    "Algorithmique",
];

const labelsFourth = [
    "Claude",
    "OpenAI / ChatGPT",
    "Gemini",
    "Grok",
    "GitHub Copilot",
    "Prompt Engineering",
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Compétences</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Développement Web Full Stack</h3>
                    <p>Je conçois et développe des applications web complètes, du frontend avec React au backend avec Laravel. Je maîtrise le cycle complet de développement logiciel, de l'analyse des besoins à la mise en production.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack technique :</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faLaravel} size="3x"/>
                    <h3>Programmation & Bases de données</h3>
                    <p>Solide maîtrise de plusieurs langages de programmation et de la gestion de bases de données relationnelles. Je conçois des architectures optimisées et scalables pour des applications performantes.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack technique :</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>Outils & Méthodologies</h3>
                    <p>Je maîtrise les outils de versioning, les environnements de développement et les méthodologies de gestion de projet. Mon approche rigoureuse garantit un code propre, documenté et maintenable.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack technique :</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>Intelligence Artificielle</h3>
                    <p>J'intègre les outils d'IA générative dans mon flux de travail pour accélérer le développement, optimiser le code et résoudre des problèmes complexes. Je maîtrise le prompt engineering et l'utilisation des principaux modèles de langage.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Pile technologique :</span>
                        {labelsFourth.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;