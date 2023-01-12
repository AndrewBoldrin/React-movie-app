
export const calculateScoreColor = (score: number) => {
    if(score <= 5) return 'red';
    if(score >= 8) return '#FFD934';
    return '#9DE600';
}