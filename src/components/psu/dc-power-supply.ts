import * as THREE from 'three';
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from '@/labs/coords';
import { M } from '@/components/shared/materials';
import { solidBox, solidCyl, textLabel } from '@/components/shared/primitives';
import { instrumentWire } from '@/components/shared/instrument-wire';
// ── DC POWER SUPPLY ──────────────────────────────────────────────────────
export function buildDcPowerSupplyStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P*7.0, BH = P*4.5, BD = P*5.0;

  root.add(solidBox(BW, BH, BD, M.dark()));

  const panel = solidBox(BW, BH, 0.04, M.gray());
  panel.position.z = BD/2 + 0.021;
  root.add(panel);

  root.add(new THREE.Mesh(new THREE.BoxGeometry(BW*0.55, BH*0.30, 0.018), M.hex(0x1a3a1a))).position.set(-BW*0.10, BH*0.22, BD/2+0.030);

  for (let i = 0; i < 4; i++) {
    const dg = new THREE.Mesh(new THREE.BoxGeometry(P*0.22, BH*0.20, 0.020), M.hex(0x22dd22));
    dg.position.set(-BW*0.22 + i*P*0.28, BH*0.22, BD/2+0.034);
    root.add(dg);
  }

  const dialR = P*0.78;
  for (const dx of [-BW*0.25, BW*0.25]) {
    const dGeo = new THREE.CylinderGeometry(dialR, dialR, 0.035, 20);
    const dial = new THREE.Mesh(dGeo, M.gray());
    dial.rotation.x = Math.PI/2;
    dial.position.set(dx, -BH*0.12, BD/2+0.038);
    dial.add(new THREE.LineSegments(new THREE.EdgesGeometry(dGeo, 20), M.edge()));
    root.add(dial);
    const kPtr = solidBox(P*0.10, P*0.10, 0.042, M.silver());
    kPtr.position.set(dx, -BH*0.12 + dialR*0.72, BD/2+0.038);
    root.add(kPtr);
  }

  for (const [dx, col] of [[BW*0.15, 0xd63b2a],[BW*0.32, 0x1a1a1a]] as [number,number][]) {
    const sock = new THREE.Mesh(new THREE.CylinderGeometry(P*0.18,P*0.18,0.045,12), M.hex(col));
    sock.rotation.x = Math.PI/2;
    sock.position.set(dx, -BH*0.30, BD/2+0.044);
    root.add(sock);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(P*0.08,P*0.08,0.050,8), M.hole());
    hole.rotation.x = Math.PI/2;
    hole.position.set(dx, -BH*0.30, BD/2+0.044);
    root.add(hole);
  }

  const btn = new THREE.Mesh(new THREE.CylinderGeometry(P*0.22,P*0.22,0.040,14), M.green());
  btn.rotation.x = Math.PI/2;
  btn.position.set(-BW*0.38, BH*0.30, BD/2+0.041);
  root.add(btn);

  root.rotation.x = 0.15;
  return root;
}

// ── BOARD-PLACED DC POWER SUPPLY ─────────────────────────────────────────
export function buildDcPowerSupply(
  position: 'left' | 'right' = 'left',
  displayValue: string = '--',
  targets?: { vcc: THREE.Vector3; gnd: THREE.Vector3 },
): THREE.Group {
  const model = buildDcPowerSupplyStandalone();

  const P = PITCH;
  const BW = P * 7.0, BH = P * 4.5, BD = P * 5.0;
  const lcdLabel = textLabel(displayValue, BW * 0.50, BH * 0.22, {
    textColor: '#22dd22',
    fontSize: 56,
    bold: true,
  });
  if (lcdLabel) {
    lcdLabel.position.set(-BW * 0.10, BH * 0.22, BD / 2 + 0.042);
    model.add(lcdLabel);
  }

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.22);

  // Position behind-left of the breadboard — like it's sitting at the back of the bench
  // Z is negative = behind the board (away from viewer)
  // X is offset left or right
  const xSign = position === 'left' ? -1 : 1;
  wrapper.position.set(xSign * (BOARD_W / 2 - 1.2), 0, -(BOARD_D / 2 + 0.5));

  const root = new THREE.Group();
  root.add(wrapper);

  // ── Connection wires to specific board holes ──────────────────────────
  if (targets) {
    const xSign = position === 'left' ? -1 : 1;
    const wrapperX = xSign * (BOARD_W / 2 - 1.2);
    const wrapperZ = -(BOARD_D / 2 + 0.5);
    const psuY = TOP_Y + PITCH * 0.5;
    const psuOrigin = new THREE.Vector3(wrapperX, psuY, wrapperZ);
    root.add(instrumentWire(psuOrigin, targets.vcc, 0xd63b2a));
    const psuOrigin2 = psuOrigin.clone();
    psuOrigin2.x += xSign * 0.06;
    psuOrigin2.z += 0.05;
    root.add(instrumentWire(psuOrigin2, targets.gnd, 0x202020));
  }

  return root;
}
