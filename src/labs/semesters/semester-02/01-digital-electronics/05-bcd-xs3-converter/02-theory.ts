import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Digital code converters are combinational circuits that translate information encoded in one binary format into another equivalent representation without altering the underlying numerical value. Code converters are fundamental in digital telecommunication, display decoders, error detection systems, and arithmetic processing units.",
    "Binary Coded Decimal (BCD / 8421 code) represents each decimal digit (0 through 9) using a unique 4-bit binary group (0000₂ to 1001₂). The remaining six combinations (1010₂ to 1111₂) are invalid states treated as don't-care conditions during circuit synthesis.",
    "Excess-3 (XS-3) code is an unweighted, self-complementing binary code formed by adding 3 (0011₂) to each 4-bit BCD digit. Its primary advantage is that the 9's complement of any decimal digit directly corresponds to the 1's complement (bitwise inversion) of its Excess-3 code, which substantially simplifies subtraction operations in digital arithmetic circuits.",
    "Using Karnaugh maps (K-maps) to minimise the output functions with inputs A (MSB), B, C, D (LSB) and don't-cares for states 10 through 15, the simplified Boolean equations for the Excess-3 output bits W (MSB), X, Y, Z (LSB) are: W = A + B(C + D), X = B ⊕ (C + D), Y = (C ⊕ D)', and Z = D'. Here, (C + D) is shared between the generation of W and X, demonstrating resource sharing in multi-output combinational logic.",
    "The Gray code (Reflected Binary Code) is an unweighted, non-arithmetic code in which consecutive numerical values differ by exactly one binary bit. This unit-distance property eliminates intermediate switching glitches in mechanical rotary shafts, optical shaft encoders, and high-speed analog-to-digital converters (ADCs).",
    "For a 4-bit binary input B₃B₂B₁B₀ to Gray code G₃G₂G₁G₀ conversion, the logic relationships are: G₃ = B₃, G₂ = B₃ ⊕ B₂, G₁ = B₂ ⊕ B₁, and G₀ = B₁ ⊕ B₀. Conversely, converting Gray code G₃G₂G₁G₀ back to binary B₃B₂B₁B₀ utilizes cascaded XOR gates: B₃ = G₃, B₂ = B₃ ⊕ G₂, B₁ = B₂ ⊕ G₁, and B₀ = B₁ ⊕ G₀.",
    "The physical realization utilizes standard 74HC CMOS logic IC packages: 74HC04 (Hex Inverter), 74HC08 (Quad 2-Input AND Gate), 74HC32 (Quad 2-Input OR Gate), and 74HC86 (Quad 2-Input XOR Gate), powered by a regulated +5 V DC supply. Output logic states are monitored using four colored LEDs (W = Red, X = Yellow, Y = Green, Z = Blue) protected by 330 Ω current-limiting resistors.",
  ],
};
