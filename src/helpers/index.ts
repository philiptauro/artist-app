export const getAge = (inputDate: Date): number | undefined => {
    const birthDate = new Date(inputDate);
    const today = new Date();
    let age = today.getFullYear() - new Date(birthDate).getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}