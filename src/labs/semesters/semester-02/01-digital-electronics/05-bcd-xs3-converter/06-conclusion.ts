import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The BCD to Excess-3 code converter was successfully designed, assembled, and experimentally validated on the breadboard. The measured LED outputs matched the theoretical truth table for all ten valid BCD input combinations (0 through 9), confirming the minimised Boolean equations W = A + B(C + D), X = B ⊕ (C + D), Y = (C ⊕ D)', and Z = D'.",
    "The experiment confirmed the self-complementing property of the Excess-3 code: taking the 1's complement of an Excess-3 code produces the 9's complement of the original decimal digit, simplifying subtractor circuit architectures in digital arithmetic units.",
    "The theoretical conversion relationships for Gray code to binary (B₃ = G₃, B₂ = B₃ ⊕ G₂, B₁ = B₂ ⊕ G₁, B₀ = B₁ ⊕ G₀) and binary to Gray code (G₃ = B₃, G₂ = B₃ ⊕ B₂, G₁ = B₂ ⊕ B₁, G₀ = B₁ ⊕ B₀) were examined, illustrating how unit-distance Gray codes prevent transient switching errors in real-world digital encoders.",
    "Hardware implementation using 74HC04, 74HC08, 74HC32, and 74HC86 ICs demonstrated effective resource sharing of intermediate sub-expressions, establishing the practical link between combinational logic theory and physical hardware.",
  ],
};
