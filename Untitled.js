function convertHeaders(tp) {
    const content = tp.file.content;
    
    const lines = content.split('\n');
    
    const convertedLines = lines.map(line => {
        const headerRegex = /^(#{1,6})\s+(.+)$/;
        const match = line.match(headerRegex);
        
        if (match) {
            const level = match[1].length;
            const text = match[2];
            
            return `<h${level} id="${text}">${text}</h${level}>`;
        }
        
        return line;
    });
    
    return convertedLines.join('\n');
}

module.exports = convertHeaders;