import { type EceComponentKind } from "@/labs/previews/EceComponentViewer";

export type ComponentData = {
  slug: string;
  name: string;
  kind: EceComponentKind;
  tagline: string;
  description: string[];
  specs: { label: string; value: string }[];
  tips: string[];
};

export const COMPONENTS_DATA: Record<string, ComponentData> = {
  breadboard: {
    slug: "breadboard",
    name: "Solderless Breadboard",
    kind: "breadboard",
    tagline: "The foundation for prototyping electronic circuits.",
    description: [
      "A breadboard is a rectangular plastic board with a grid of tiny holes. It allows you to easily connect electronic components together to build and test circuits without soldering.",
      "The holes are connected underneath by metal clips. The outer rows (power rails) are connected horizontally, while the inner rows (terminal strips) are connected vertically, with a gap in the middle to straddle ICs.",
    ],
    specs: [
      { label: "Type", value: "Solderless" },
      { label: "Tie points", value: "830" },
      { label: "Power rails", value: "2 pairs (Top/Bottom)" },
      { label: "Pitch", value: "0.1 inch (2.54 mm)" },
    ],
    tips: [
      "Always connect your power supply to the top and bottom rails first.",
      "Use the centre gap to mount DIP ICs (chips).",
      "Keep your wiring neat to make debugging easier.",
    ],
  },
  resistors: {
    slug: "resistors",
    name: "Resistors",
    kind: "resistor",
    tagline: "Control the flow of electrical current.",
    description: [
      "Resistors are passive components that resist the flow of electrical current. They are used to limit current, divide voltages, and protect delicate components like LEDs from receiving too much power.",
      "The resistance value is measured in Ohms (Ω) and is typically indicated by a series of colored bands painted on the body of the resistor.",
    ],
    specs: [
      { label: "Type", value: "Through-hole (Axial)" },
      { label: "Power rating", value: "1/4 Watt" },
      { label: "Tolerance", value: "±5% (Gold band)" },
      { label: "Polarity", value: "None (Bi-directional)" },
    ],
    tips: [
      "Resistors have no polarity; they can be plugged in either way.",
      "Always use a current-limiting resistor in series with an LED.",
      "Learn the resistor color code or keep a reference chart handy.",
    ],
  },
  capacitors: {
    slug: "capacitors",
    name: "Capacitors",
    kind: "capacitor",
    tagline: "Store and release electrical energy.",
    description: [
      "Capacitors store electrical energy temporarily in an electric field. They are used for filtering noise in power supplies, smoothing out voltage spikes, and in timing circuits.",
      "Electrolytic capacitors (like the blue one shown) have high capacitance but are polarized, meaning they must be connected in the correct direction.",
    ],
    specs: [
      { label: "Type", value: "Electrolytic / Ceramic" },
      { label: "Capacitance", value: "Microfarads (µF) to Picofarads (pF)" },
      { label: "Polarity", value: "Yes (for Electrolytic)" },
      { label: "Voltage rating", value: "Variable (e.g. 25V)" },
    ],
    tips: [
      "Pay attention to polarity! The striped side of an electrolytic capacitor indicates the negative terminal.",
      "Ceramic capacitors (the small disc ones) are not polarized.",
      "Ensure the voltage rating of the capacitor exceeds your circuit voltage.",
    ],
  },
  leds: {
    slug: "leds",
    name: "Light Emitting Diodes",
    kind: "led",
    tagline: "Visual indicators for your circuits.",
    description: [
      "LEDs (Light Emitting Diodes) are semiconductors that emit light when current flows through them. They are essential for providing visual feedback in circuits.",
      "Because they are diodes, they only allow current to flow in one direction. They must be oriented correctly and always require a resistor to prevent them from burning out.",
    ],
    specs: [
      { label: "Type", value: "5mm Through-hole" },
      { label: "Forward Voltage", value: "~2.0V (varies by color)" },
      { label: "Forward Current", value: "20mA (Max)" },
      { label: "Polarity", value: "Yes (Long leg = Anode/+)" },
    ],
    tips: [
      "The longer leg is the anode (positive) and the shorter leg is the cathode (negative).",
      "The flat edge on the plastic collar also indicates the cathode side.",
      "Never connect an LED directly to a power source without a resistor.",
    ],
  },
  "ics-gates": {
    slug: "ics-gates",
    name: "Integrated Circuits & Gates",
    kind: "xor-gate",
    tagline: "The building blocks of digital logic.",
    description: [
      "Integrated Circuits (ICs) pack complex circuits into a single chip. In digital electronics, the most common chips are logic gates (AND, OR, NOT, etc.) which perform basic boolean logic operations.",
      "These chips typically come in a Dual In-line Package (DIP) and must be placed across the center gap of the breadboard so their pins do not short together.",
    ],
    specs: [
      { label: "Package", value: "DIP-14 or DIP-16" },
      { label: "Logic Family", value: "74LS or 74HC series" },
      { label: "Operating Voltage", value: "5V (Standard)" },
      { label: "Pin Pitch", value: "0.1 inch (Fits breadboard)" },
    ],
    tips: [
      "Always align the notch or dot on the chip to face the top/left of the board to identify Pin 1.",
      "Connect VCC (power) and GND (ground) before wiring any logic inputs.",
      "Never leave unused input pins floating (unconnected); tie them to ground or VCC.",
    ],
  },
};
