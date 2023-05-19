class HeroData {
    name = "Paul";
    surname = "Kalashkov";
    phone = "+79850491141";
    birthdate = "2002-11-09T20:00:00.000Z";

    getAge() {
        const today = new Date();
        const birth = new Date(this.birthdate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
}

export const shortHeroData = new HeroData();