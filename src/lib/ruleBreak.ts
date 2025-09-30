export function ruleBreaker(data: any) {
  let result; // violates "avoid let"
  
  if (!data) {
    result = "No data"; // no else, but we will add one anyway to break rule
  } else {
    result = "Data found"; // violates "avoid else"
  }

  try { // violates "avoid try/catch"
    const parsed = JSON.parse(data); // unnecessary parsing
    return parsed;
  } catch (err) {
    return err;
  }
}