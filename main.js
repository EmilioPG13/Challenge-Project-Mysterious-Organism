// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrganism) {
      let commonBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          commonBases++;
        }
      }
      const percentage = ((commonBases / this.dna.length) * 100).toFixed(2);
      console.log(`Specimen #${this.specimenNum} and specimen #${otherOrganism.specimenNum} have ${percentage}% DNA in common.`);
    },
    willLikelySurvive() {
      const cAndG = this.dna.filter(base => base === 'C' || base === 'G');
      const percentage = (cAndG.length / this.dna.length) * 100;
      return percentage >= 60;
    }
  };
};

// Create 30 instances of pAequor that can likely survive
const thirtySurvivors = [];
let specimenCounter = 1;
while (thirtySurvivors.length < 30) {
  const newOrganism = pAequorFactory(specimenCounter, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    thirtySurvivors.push(newOrganism);
  }
  specimenCounter++;
}

// Test
console.log(thirtySurvivors);
