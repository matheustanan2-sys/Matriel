import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// Fade + rise on scroll into view
export const Reveal = ({ children, delay = 0, y = 40, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

// Masked line-by-line reveal for headings.
// Pass an array of strings (each = one line).
export const MaskedLines = ({ lines, className = "", lineClassName = "", delay = 0, start = false }) => {
  const anim = start ? "show" : undefined;
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "110%" }}
            animate={anim}
            variants={{ show: { y: "0%" } }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export { EASE };
