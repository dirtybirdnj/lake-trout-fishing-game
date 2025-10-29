import Fish from './fish.js';
import { Utils } from '../utils/Constants.js';

/**
 * Yellow Perch - Perca flavescens
 * Opportunistic feeder, beginner-friendly species
 */
export class YellowPerch extends Fish {
    constructor(scene, x, y, size = 'MEDIUM', fishingType = null) {
        super(scene, x, y, size, fishingType, 'yellow_perch_large');
    }

    /**
     * Yellow perch length-weight formula
     * Smaller, deep-bodied fish
     * length in inches ≈ 9.5 * weight^0.35
     */
    calculateLength() {
        return Math.round(9.5 * Math.pow(this.weight, 0.35));
    }

    /**
     * Yellow perch age-weight relationship
     * Fast growth, shorter lifespan
     */
    calculateBiologicalAge() {
        if (this.weight <= 0.7) {
            return Math.round(Utils.randomBetween(1, 3));
        } else if (this.weight <= 1.2) {
            return Math.round(Utils.randomBetween(3, 5));
        } else if (this.weight <= 2.0) {
            return Math.round(Utils.randomBetween(5, 8));
        } else {
            return Math.round(Utils.randomBetween(8, 12));
        }
    }

    /**
     * Render yellow perch body
     */
    renderBody(bodySize, isMovingRight) {
        const colors = this.speciesData.appearance.colorScheme;

        this.graphics.save();
        this.graphics.translateCanvas(this.x, this.y);

        if (isMovingRight) {
            this.graphics.rotateCanvas(this.angle);
        } else {
            this.graphics.scaleCanvas(-1, 1);
            this.graphics.rotateCanvas(-this.angle);
        }

        // Perch body - deep and laterally compressed
        const perchLength = bodySize * 2.0;
        const perchHeight = bodySize * 0.85;

        // Main body - golden yellow
        this.graphics.fillStyle(colors.base, 1.0);
        this.graphics.fillEllipse(0, 0, perchLength, perchHeight);

        // Belly - pale yellow/cream
        this.graphics.fillStyle(colors.belly, 0.9);
        this.graphics.fillEllipse(0, perchHeight * 0.25, perchLength * 0.8, perchHeight * 0.45);

        // Vertical bars - 6-8 dark bars
        this.graphics.fillStyle(colors.bars, 0.75);
        const barCount = 7;
        const barWidth = perchLength * 0.09;
        const barSpacing = perchLength / (barCount + 1);

        for (let i = 0; i < barCount; i++) {
            const barX = -perchLength * 0.4 + (i * barSpacing);
            const heightMultiplier = 1.0 - Math.abs(i - barCount / 2) * 0.12;
            const barHeight = perchHeight * 0.75 * heightMultiplier;

            this.graphics.fillRect(
                barX - barWidth / 2,
                -barHeight / 2,
                barWidth,
                barHeight
            );
        }

        // Tail
        const tailSize = bodySize * 0.7;
        const tailX = -perchLength * 0.45;

        this.graphics.fillStyle(colors.fins, 0.9);
        this.graphics.beginPath();
        this.graphics.moveTo(tailX, 0);
        this.graphics.lineTo(tailX - tailSize * 0.65, -tailSize * 0.55);
        this.graphics.lineTo(tailX - tailSize * 0.65, tailSize * 0.55);
        this.graphics.closePath();
        this.graphics.fillPath();

        // Spiny dorsal fin (front)
        this.graphics.fillStyle(colors.fins, 0.85);
        const spinyDorsalX = -perchLength * 0.15;
        this.graphics.fillTriangle(
            spinyDorsalX, -perchHeight * 0.5,
            spinyDorsalX - bodySize * 0.35, -perchHeight * 1.2,
            spinyDorsalX + bodySize * 0.15, -perchHeight * 1.1
        );

        // Soft dorsal fin (rear) - orange/red tinted
        this.graphics.fillStyle(colors.fins, 0.9);
        const softDorsalX = perchLength * 0.05;
        this.graphics.fillTriangle(
            softDorsalX, -perchHeight * 0.5,
            softDorsalX - bodySize * 0.15, -perchHeight * 1.0,
            softDorsalX + bodySize * 0.25, -perchHeight * 0.9
        );

        // Pectoral fins
        const finX = -bodySize * 0.15;
        this.graphics.fillTriangle(
            finX, 0,
            finX - bodySize * 0.3, -perchHeight * 0.25,
            finX - bodySize * 0.3, perchHeight * 0.25
        );

        this.graphics.restore();
    }

    /**
     * Render yellow perch at position (for catch popup)
     */
    renderBodyAtPosition(graphics, bodySize) {
        const colors = this.speciesData.appearance.colorScheme;

        const perchLength = bodySize * 2.0;
        const perchHeight = bodySize * 0.85;

        // Main body - golden yellow
        graphics.fillStyle(colors.base, 1.0);
        graphics.fillEllipse(0, 0, perchLength, perchHeight);

        // Belly - pale yellow/cream
        graphics.fillStyle(colors.belly, 0.9);
        graphics.fillEllipse(0, perchHeight * 0.25, perchLength * 0.8, perchHeight * 0.45);

        // Vertical bars
        graphics.fillStyle(colors.bars, 0.75);
        const barCount = 7;
        const barWidth = perchLength * 0.09;
        const barSpacing = perchLength / (barCount + 1);

        for (let i = 0; i < barCount; i++) {
            const barX = -perchLength * 0.4 + (i * barSpacing);
            const heightMultiplier = 1.0 - Math.abs(i - barCount / 2) * 0.12;
            const barHeight = perchHeight * 0.75 * heightMultiplier;

            graphics.fillRect(
                barX - barWidth / 2,
                -barHeight / 2,
                barWidth,
                barHeight
            );
        }

        // Tail
        const tailSize = bodySize * 0.7;
        const tailX = -perchLength * 0.45;

        graphics.fillStyle(colors.fins, 0.9);
        graphics.beginPath();
        graphics.moveTo(tailX, 0);
        graphics.lineTo(tailX - tailSize * 0.65, -tailSize * 0.55);
        graphics.lineTo(tailX - tailSize * 0.65, tailSize * 0.55);
        graphics.closePath();
        graphics.fillPath();

        // Dorsal fins
        graphics.fillStyle(colors.fins, 0.85);
        const spinyDorsalX = -perchLength * 0.15;
        graphics.fillTriangle(
            spinyDorsalX, -perchHeight * 0.5,
            spinyDorsalX - bodySize * 0.35, -perchHeight * 1.2,
            spinyDorsalX + bodySize * 0.15, -perchHeight * 1.1
        );

        graphics.fillStyle(colors.fins, 0.9);
        const softDorsalX = perchLength * 0.05;
        graphics.fillTriangle(
            softDorsalX, -perchHeight * 0.5,
            softDorsalX - bodySize * 0.15, -perchHeight * 1.0,
            softDorsalX + bodySize * 0.25, -perchHeight * 0.9
        );

        // Pectoral fins
        const finX = -bodySize * 0.15;
        graphics.fillTriangle(
            finX, 0,
            finX - bodySize * 0.3, -perchHeight * 0.25,
            finX - bodySize * 0.3, perchHeight * 0.25
        );
    }
}

export default YellowPerch;
