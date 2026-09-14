/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save Component for frontend serialization
 *
 * @param {object} props
 * @param {object} props.attributes Block attributes
 * @return {JSX.Element} Serialized markup
 */
export default function save({ attributes }) {
	const { code, language, theme } = attributes;

	const blockProps = useBlockProps.save({
		className: `wp-block-custom-codemirror-block theme-${theme}`,
		'data-language': language,
		'data-theme': theme,
	});

	return (
		<div {...blockProps}>
			<div className="custom-codemirror-header">
				<div className="custom-codemirror-window-dots" aria-hidden="true">
					<span className="dot dot-red" />
					<span className="dot dot-yellow" />
					<span className="dot dot-green" />
				</div>
				<div className="custom-codemirror-header-center">
					<span className="custom-codemirror-language-badge">
						{language ? language.toUpperCase() : 'CODE'}
					</span>
				</div>
				<div className="custom-codemirror-header-right">
					<button
						type="button"
						className="custom-codemirror-copy-btn"
						aria-label="Copy code to clipboard"
						title="Copy code"
						data-copied-text="Copied!"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
						</svg>
						<span className="copy-label">Copy</span>
					</button>
				</div>
			</div>
			<pre className="custom-codemirror-pre">
				<code className={`language-${language}`}>
					{code}
				</code>
			</pre>
		</div>
	);
}
