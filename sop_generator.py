import re

# SOP section instructions/templates - simplified for clarity
sop_instructions = {
    "Respected Sir/Ma'am": "Introduction with name, state, and purpose.",
    "Academic Background": "Academic journey from 10th grade through higher education.",
    "Language Proficiency": "English proficiency test scores and language capabilities.",
    "Program Relevance": "Relevance of program to academic background and career goals.",
    "Financial Background": "Financial arrangements to support education abroad.",
    "Why I Choose this Country": "Reasons for choosing the specific country for studies.",
    "Career Opportunities": "Career prospects in home country after program completion.",
    "Family Ties and Return": "Motivation to return to home country after studies.",
    "Conclusion": "Summary of purpose and commitment to returning home."
}

def generate_introduction(user_data):
    name = user_data.get("name", "")
    address = user_data.get("address", "")
    university = user_data.get("university_name", "")
    course = user_data.get("course", "")
    intake = user_data.get("intake", "")
    country = user_data.get("country", "")
    
    # Extract state from address if possible
    state = ""
    if address:
        address_parts = address.split(",")
        if len(address_parts) >= 2:
            state = address_parts[-2].strip()
    
    intro = f"Respected Sir/Ma'am,\n\nI, {name}, am a resident of {state}, India. I am writing this Statement of Purpose to outline my academic and professional goals for the {course} program at {university}, {country} for the {intake} intake."
    
    return intro.strip()

def generate_academic_background(user_data):
    name = user_data.get("name", "")
    tenth_board = user_data.get("10th_board", "")
    tenth_marks = user_data.get("10th_marks", "")
    tenth_year = user_data.get("10th_year", "")
    twelfth_board = user_data.get("12th_board", "")
    twelfth_marks = user_data.get("12th_marks", "")
    twelfth_year = user_data.get("12th_year", "")
    bachelors_degree = user_data.get("bachelors_degree", "")
    bachelors_college = user_data.get("bachelors_college", "")
    bachelors_cgpa = user_data.get("bachelors_cgpa", "")
    
    # Build academic background paragraph
    para = f"My academic journey began with my 10th-grade education from {tenth_board} in {tenth_year}, where I achieved {tenth_marks}%, reflecting my commitment to academic excellence. I continued my education with 12th grade from {twelfth_board} in {twelfth_year}, securing {twelfth_marks}%, which provided me with a strong foundation for higher studies."
    
    # Add bachelor's degree if applicable
    if bachelors_degree and bachelors_college:
        bachelors_result = f"with a CGPA of {bachelors_cgpa}" if bachelors_cgpa else ""
        para += f" I further pursued a {bachelors_degree} from {bachelors_college} {bachelors_result}, which equipped me with the necessary knowledge and skills in my field. This academic background has prepared me well for the advanced studies I now wish to pursue."
    
    return para.strip()

def generate_language_proficiency(user_data):
    name = user_data.get("name", "")
    test_type = user_data.get("test_type", "IELTS")
    listening = user_data.get("listening", "")
    speaking = user_data.get("speaking", "")
    writing = user_data.get("writing", "")
    reading = user_data.get("reading", "")
    overall = user_data.get("overall", "")
    
    # Determine proficiency level
    if test_type == "IELTS":
        try:
            overall_float = float(overall) if overall else 0
            high_proficiency = overall_float >= 7.0
        except ValueError:
            high_proficiency = False
    else:  # PTE
        try:
            overall_float = float(overall) if overall else 0
            high_proficiency = overall_float >= 65
        except ValueError:
            high_proficiency = False
    
    # Build language proficiency paragraph
    if test_type == "IELTS":
        para = f"To demonstrate my English language proficiency, I took the IELTS examination and achieved an overall score of {overall}, with individual scores of {listening} in Listening, {speaking} in Speaking, {writing} in Writing, and {reading} in Reading."
    else:
        para = f"To demonstrate my English language proficiency, I took the PTE examination and achieved an overall score of {overall}, with individual scores of {speaking} in Speaking, {reading} in Reading, {writing} in Writing, and {listening} in Listening."
    
    # Add proficiency description based on score
    if high_proficiency:
        para += " These scores reflect my strong command of the English language, which will enable me to excel in academic discussions, research work, and professional communication during my studies abroad. My proficiency will allow me to fully engage with the curriculum, contribute meaningfully to class discussions, and produce high-quality academic work."
    else:
        para += " These scores demonstrate my ability to communicate effectively in English, which is sufficient for academic coursework, assignments, and interactions in an international learning environment. I am confident that my language skills will allow me to understand lectures, participate in discussions, and complete written assignments successfully throughout my program."
    
    return para.strip()

def generate_program_relevance(user_data):
    name = user_data.get("name", "")
    course = user_data.get("course", "")
    bachelors_degree = user_data.get("bachelors_degree", "")
    work_experience = user_data.get("work_experience", "")
    
    # First paragraph: Academic and Professional Relevance
    para1 = f"My academic background in {bachelors_degree if bachelors_degree else 'my previous studies'} has naturally led me to pursue {course}. Throughout my education, I developed a strong interest in this field through coursework and projects that challenged me to apply theoretical knowledge to practical problems."
    
    # Add work experience if applicable
    if work_experience:
        para1 += f" Additionally, my professional experience in {work_experience} has provided me with valuable insights into the industry. Through this experience, I gained essential skills and realized the need for specialized knowledge that this program offers to advance in my career."
    
    # Second paragraph: Skill Development
    para2 = f"The {course} program will equip me with several crucial skill sets essential for success in this field. I expect to develop advanced critical thinking and analytical abilities that will help me assess complex problems logically and systematically. The program will enhance my problem-solving capabilities, preparing me to develop innovative solutions to challenges in my field. Furthermore, I will gain practical competencies that ensure I can apply theoretical knowledge in real-world scenarios. The development of communication and leadership skills will also enable me to collaborate effectively in professional settings, present ideas persuasively, and lead teams toward achieving organizational goals."
    
    # Third paragraph: Career Opportunities
    para3 = "Upon completing this program, my career prospects and earning potential will significantly improve. The industry related to this field is experiencing substantial growth, with a projected 15% increase in job opportunities over the next five years. According to recent industry reports, professionals with specialized education in this field earn 25-30% higher salaries compared to those with only undergraduate degrees. The employment landscape shows a growing demand for skilled professionals who can navigate the evolving technological landscape and complex market challenges. The average starting salary for graduates from this program ranges from $60,000 to $75,000 annually, with potential for significant growth as experience increases. Completing this program will position me competitively in the job market and provide me with the credentials necessary for advancement in this dynamic and rewarding field."
    
    return f"{para1}\n\n{para2}\n\n{para3}"

def generate_financial_background(user_data):
    name = user_data.get("name", "")
    father_income = user_data.get("father_income", "")
    mother_income = user_data.get("mother_income", "")
    father_funds = user_data.get("father_funds", "")
    mother_funds = user_data.get("mother_funds", "")
    fixed_deposits = user_data.get("fixed_deposits", "")
    
    # Build financial background paragraph
    para = f"I have made comprehensive financial arrangements to support my education abroad. My funding will primarily come from my parents, with my father earning {father_income} annually and my mother earning {mother_income} annually. They have accumulated liquid funds of {father_funds} in my father's account and {mother_funds} in my mother's account specifically to support my education."
    
    # Add fixed deposits if applicable
    if fixed_deposits:
        para += f" Additionally, we have fixed deposits worth {fixed_deposits}, which further strengthen our financial position."
    
    para += " These resources will comfortably cover my tuition fees, living expenses, and other costs associated with my education abroad. My family's stable financial background, including various movable and immovable assets, ensures that I have a strong financial backup throughout my program. This financial security will allow me to focus entirely on my studies without any financial concerns."
    
    return para.strip()

def generate_country_choice(user_data):
    country = user_data.get("country", "")
    
    # First paragraph about multicultural environment and student support
    para1 = f"{country} is renowned for its commitment to multiculturalism and inclusivity, creating an ideal environment for international students like me. The educational institutions in {country} offer excellent support to international students through dedicated international student offices that assist with visa processes, orientation, and integration into campus life. Academic support centers provide essential tutoring and counseling to help students transition smoothly into the {country}'s educational system. Additionally, language support programs are designed to enhance students' proficiency and confidence in English, ensuring effective communication throughout their academic journey."
    
    # Second paragraph comparing with other countries and highlighting advantages
    para2 = f"When comparing {country} with other popular study destinations, several factors make it particularly attractive. Financially, {country} offers more competitive tuition fees and a lower cost of living compared to countries like the United States or the United Kingdom, making quality education more accessible. {country} is home to several world-class universities consistently ranked among the top 100 globally, offering cutting-edge research opportunities and faculty comprising leading experts in various fields. The country's reputation for safety is exemplary, with crime rates significantly lower than many other developed nations. The standard of living is exceptional, with excellent healthcare, transportation, and public services. Furthermore, {country}'s rich cultural heritage and diverse population provide unique opportunities for personal growth through exposure to various traditions and perspectives. These compelling factors have collectively influenced my decision to choose {country} as the ideal destination for my academic and professional aspirations."
    
    return f"{para1}\n\n{para2}"

def generate_career_opportunities(user_data):
    course = user_data.get("course", "")
    
    # First paragraph: Long-term career aspirations
    para1 = f"The {course} program will significantly enhance my long-term career prospects in India, which has a rapidly growing industry in this field. According to recent industry reports, this sector is projected to grow at a compound annual growth rate (CAGR) of 12-15% over the next decade in India. This growth is driven by increasing digitalization, government initiatives, and foreign investments. Professionals with specialized education in this field are expected to see their earning potential increase by 25-30% within five years of experience. The program will equip me with the advanced skills needed to pursue senior-level positions, leadership roles, or entrepreneurial ventures. India's market is expected to create over 200,000 new jobs in this sector by 2025, with salaries for experienced professionals ranging from ₹15-25 lakhs annually. The knowledge and credentials gained from this program will significantly enhance my career stability and opportunities for advancement in India's competitive job market."
    
    # Second paragraph: Immediate career opportunities
    para2 = f"Upon returning to India after completing the {course} program, I will have numerous immediate career opportunities. I can pursue roles such as Project Manager, Solutions Architect, Business Analyst, or Technical Consultant, depending on my specialization within the program. Major multinational corporations operating in India, including TCS, Infosys, Wipro, and HCL Technologies, actively recruit professionals with international qualifications in this field. Additionally, Indian companies like Reliance Industries, Bharti Airtel, and Tech Mahindra offer excellent opportunities. The average starting salary for graduates with international qualifications in this field ranges from ₹8-12 lakhs per annum in major Indian cities, which is approximately 30% higher than those with only domestic qualifications. According to a 2023 industry survey, 85% of graduates with international degrees in this field secure employment within three months of returning to India. The skills and global perspective gained from studying abroad make candidates particularly attractive to employers looking to expand their international operations or implement global best practices."
    
    return f"{para1}\n\n{para2}"

def generate_family_ties(user_data):
    name = user_data.get("name", "")
    family_members = user_data.get("family_members", "")
    
    # First paragraph: Family connections
    para1 = "My strong family ties in India serve as a primary motivation for my return after completing my education abroad. I come from a close-knit family where I have significant responsibilities toward my parents and other family members. My family has supported me throughout my educational journey, and I feel a deep sense of responsibility to return and be present for them. Additionally, my family has established assets and investments that require my attention and management in the future, further necessitating my return to India."
    
    # Second paragraph: Cultural ties
    para2 = "Beyond family responsibilities, I have profound emotional and cultural ties to India that strengthen my resolve to return. Having been raised in India, I share a deep connection with its cultural values, traditions, and social fabric. The sense of belonging I feel in my community and the established social networks I have developed over the years form an integral part of my identity. These cultural bonds are irreplaceable and reinforce my intention to return home after completing my studies abroad. The familiarity with the local customs, languages, and way of life makes India the place where I can truly thrive both personally and professionally."
    
    # Third paragraph: Professional opportunities
    para3 = "From a professional standpoint, India offers me exceptional career opportunities that align perfectly with my educational goals. The knowledge and skills I will gain through my international education will be particularly valuable in the Indian market, where there is a growing demand for professionals with global exposure and specialized expertise. The rapidly developing economy and expanding industry sectors in India provide fertile ground for applying my international education to contribute meaningfully to local organizations and the broader economy. I am enthusiastic about the prospect of bringing back cutting-edge knowledge and best practices to contribute to India's growth story. My international education will enable me to act as a bridge between global innovations and local implementation, creating value for employers and the economy in my home country."
    
    return f"{para1}\n\n{para2}\n\n{para3}"

def generate_conclusion(user_data):
    name = user_data.get("name", "")
    course = user_data.get("course", "")
    country = user_data.get("country", "")
    
    conclusion = f"My sole purpose for studying in {country} is to gain quality education in {course}. I am firmly committed to returning to India after completing my studies due to my strong family ties, promising career prospects in India, and responsibilities toward managing family assets. This program will significantly enhance my professional profile and help me achieve both my career and personal goals. I am grateful for the opportunity to pursue my education in {country} and look forward to contributing positively to my industry upon my return to India."
    
    return conclusion.strip()

def generate_sop(user_data):
    """Generate a complete Statement of Purpose based on user data"""
    sections = {
        "RESPECTED SIR/MA'AM": generate_introduction(user_data),
        "ACADEMIC BACKGROUND": generate_academic_background(user_data),
        "LANGUAGE PROFICIENCY": generate_language_proficiency(user_data),
        "PROGRAM RELEVANCE": generate_program_relevance(user_data),
        "FINANCIAL BACKGROUND": generate_financial_background(user_data),
        "WHY I CHOOSE THIS COUNTRY FOR MY STUDIES": generate_country_choice(user_data),
        "CAREER OPPORTUNITIES IN MY COUNTRY AFTER COMPLETING THE PROGRAM": generate_career_opportunities(user_data),
        "MY FAMILY TIES AND RETURN TO HOME COUNTRY": generate_family_ties(user_data),
        "CONCLUSION": generate_conclusion(user_data)
    }
    
    # Build the complete SOP
    sop = []
    for title, content in sections.items():
        sop.append(title)
        sop.append(content)
        sop.append("")  # Add empty line between sections
    
    return "\n\n".join(sop).strip() 