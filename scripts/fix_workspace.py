import re
import sys

file_path = '/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/workspace/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the missing run button in PreSimulationUI
target_run_button = """                )}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );"""
replacement_run_button = """                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
             <button 
               onClick={handleSimulate}
               disabled={!uploadedFile}
               className="bg-white text-black px-8 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
               INITIALIZE SWARM
             </button>
          </div>
        </div>
      </div>
    </div>
  );"""

if target_run_button in content:
    content = content.replace(target_run_button, replacement_run_button)
else:
    print("Could not find target_run_button")

# 2. Fix the EnterpriseReport numbers
target_report_numbers = """  const EnterpriseReport = () => {
    const currentRadius = isRadiusOptimized ? 10 : radiusKm;
    const displayConfidence = Math.max(52, Math.round(98 - (currentRadius * 0.46)));
    const displayFriction = Math.max(4, 14 - (isDialectOptimized ? 4 : 0) - (isFrictionOptimized ? 6 : 0));
    const displayRoas = 12 + (isDialectOptimized ? 6 : 0) + (isFrictionOptimized ? 8 : 0);"""

replacement_report_numbers = """  const EnterpriseReport = () => {
    const currentRadius = isRadiusOptimized ? 10 : radiusKm;
    const displayConfidence = reportData?.dataConfidence || Math.max(52, Math.round(98 - (currentRadius * 0.46)));
    const displayFriction = reportData?.overallFriction || Math.max(4, 14 - (isDialectOptimized ? 4 : 0) - (isFrictionOptimized ? 6 : 0));
    const displayRoas = reportData?.roasPotential || 12 + (isDialectOptimized ? 6 : 0) + (isFrictionOptimized ? 8 : 0);"""

if target_report_numbers in content:
    content = content.replace(target_report_numbers, replacement_report_numbers)
else:
    print("Could not find target_report_numbers")

# 3. Fix the rendering bugs by calling components as functions instead of JSX elements
target_render = """        {activeTab === 'workspace' && (
          <AnimatePresence mode="wait">
            {appMode === 'upload' && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                <PreSimulationUI />
              </motion.div>
            )}
            
            {appMode === 'simulating' && (
              <motion.div key="simulating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                <SimulationUI />
              </motion.div>
            )}

            {appMode === 'enterprise_report' && (
              <motion.div key="enterprise_report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0">
                <EnterpriseReport />
              </motion.div>
            )}"""

replacement_render = """        {activeTab === 'workspace' && (
          <AnimatePresence mode="wait">
            {appMode === 'upload' && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                {PreSimulationUI()}
              </motion.div>
            )}
            
            {appMode === 'simulating' && (
              <motion.div key="simulating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                {SimulationUI()}
              </motion.div>
            )}

            {appMode === 'enterprise_report' && (
              <motion.div key="enterprise_report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0">
                {EnterpriseReport()}
              </motion.div>
            )}"""

if target_render in content:
    content = content.replace(target_render, replacement_render)
else:
    print("Could not find target_render")

# 4. Fix ApiConsole rendering
target_api_console = """        {activeTab === 'api' && (
          <ApiConsoleUI />
        )}"""

replacement_api_console = """        {activeTab === 'api' && (
          ApiConsoleUI()
        )}"""

if target_api_console in content:
    content = content.replace(target_api_console, replacement_api_console)
else:
    print("Could not find target_api_console")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated page.tsx")
