import {format} from 'fecha';
import {FC, memo, useEffect, useRef, useState} from 'react';

import {apiConfig} from '../../../configs/api.config';
import {SectionId} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import {SkillGroup} from './Skills';
import TimelineItem from './TimelineItem';

const Resume: FC = memo(() => {
  const [educationSkills, setEducationSkills] = useState<any>([]);
  const [experienceSkills, setExperienceSkills] = useState<any>([]);
  const [skillData, setSkillData] = useState<any>([]);
  const skillDataRef = useRef<any>([]);

  useEffect(() => {
    fetch(`http://${apiConfig.url}:${apiConfig.port}${apiConfig.getSkills}`, {
      method: "GET",
    }).then(data => {
      return data ? data.json() : {} as any
    })
    .then((userdata) => {
      console.log(userdata);
      userdata.names.forEach((item: any) => {
        fetch(`http://${apiConfig.url}:${apiConfig.port}${apiConfig.getSkill}`, {
          method: "PUT",
          body: JSON.stringify({
            skillName: item
        }),
        }).then(data => {
          return data ? data.json() : {} as any
        }).then(json => {
          const skill = json.skill;
          const newSkill = {
            date: format(new Date(skill.startdate), 'MMMM, YYYY'),
            content: <p>{skill.description.substr(skill.description.indexOf("|") + 1, skill.description.length)}</p>,
            title: skill.name,
            location: skill.description.substr(0, skill.description.indexOf("|"))
          };
          if (skill.link === "education") {
            setEducationSkills([...educationSkills, newSkill]);
          } else if (skill.link === "experience") {
            setExperienceSkills([...experienceSkills, newSkill]);
          } else if (skill.link === "skill") {
            if (skillDataRef.current.length === 0) {
              skillDataRef.current = [{
                name: skill.description,
                skills: [{
                  name: skill.name,
                  level: skill.competence,
                }]
              }];
              setSkillData(skillDataRef.current)
            } else {
              let shouldReturn = false;
              skillDataRef.current.forEach((skillGroup: any, i: number) => {
                if (skillGroup.name === skill.description) {
                  const newSkillData = JSON.parse(JSON.stringify(skillDataRef.current));
                  newSkillData.splice(i, 1);
                  const newSkillGroup = {
                    name: skill.description,
                    skills: [
                      ...skillGroup.skills,
                      {
                        name: skill.name,
                        level: skill.competence
                      }
                    ]
                  };
                  skillDataRef.current = [...newSkillData, newSkillGroup];
                  setSkillData(skillDataRef.current);
                  shouldReturn = true;
                }
              });
              if (shouldReturn) return;
              skillDataRef.current = [
                ...skillDataRef.current,
                {
                  name: skill.description,
                  skills: [{
                    name: skill.name,
                    level: skill.competence,
                  }]
                }
              ];
              setSkillData(skillDataRef.current);
            }
          }
        });
      });
    })
    .catch(e => {
        console.error(e);
    });
  }, []);

  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Education">
          {educationSkills.map((item: any, index: number) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Work">
          {experienceSkills.map((item: any, index: number) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Skills">
          <p className="pb-8">Here you can see my skills</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skillData.map((skillgroup: any, index: number) => (
              <SkillGroup key={`${skillgroup.name}-${index}`} skillGroup={skillgroup} />
            ))}
          </div>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
