
const PackagesForm = ({ packages, onPackageChange, onAddPackage, onRemovePackage, formErrors }) => {
  return (
    <div className='form-group-packages'>
      <h3>Packages</h3>

      {/* Map over  packages array to render each package form fields */}
      {packages.map((pkg, index) => (
        <div key={pkg.id || `new-pkg-${index}`} className="form-group-packages"> 
          <h4>Package {index + 1}</h4>

          <div className='form-group-horizontal'>
            <div className='form-group'>
              <label className='form-label'>Title</label>
              <select className="form-input" name="title" value={pkg.title} onChange={(e) => onPackageChange(index, e)}  required>

                <option value="">Titles</option>
                <option value="General Admission">General Admission</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="Diamond">Diamond</option>
                <option value="VIP Lounge">VIP Lounge</option>
                <option value="Artists Meet-and-Greet">Artists Meet-and-Greet</option>
                <option value="Ultimate Access">Ultimate Access</option>

              </select>
              {formErrors[`packageTitle${index}`] && <p className="form-error">{formErrors[`packageTitle${index}`]}</p>}
            
            </div>

            <div className='form-group'>
              <label className='form-label'>Seating Arrangement</label>
              <select className="form-input" name="seatingArrangement" value={pkg.seatingArrangement} onChange={(e) => onPackageChange(index, e)} required>
                <option value="">Seating Arrangements</option>
                <option value="Standing">Standing</option>
                <option value="Seating">Seating</option>
              </select>
              {formErrors[`packageSeating${index}`] && <p className="form-error">{formErrors[`packageSeating${index}`]}</p>}
            </div>

            <div className='form-group'>
              <label className='form-label'>Placement</label>
              <select className="form-input" name="placement" value={pkg.placement} onChange={(e) => onPackageChange(index, e)} required>

                <option value="">Placements</option>
                <option value="Access to Festival Grounds">Access to Festival Grounds</option>
                <option value="Mid-Tier View">Mid-Tier View</option>
                <option value="Prime View">Prime View</option>
                <option value="Near Stage">Near Stage</option>
                <option value="Front-Row View">Front-Row View</option>
                <option value="Exclusive Lounge">Exclusive Lounge</option>
                <option value="Backstage Access">Backstage Access</option>
                <option value="All-Inclusive Benefits">All-Inclusive Benefits</option>
              </select>
              {formErrors[`packagePlacement${index}`] && <p className="form-error">{formErrors[`packagePlacement${index}`]}</p>}
            </div>
          </div>

          <div className='form-group-horizontal'>
            <div className='form-group'>
              <label className='form-label'>Price</label>
              <input className="form-input" type="number" name="price" value={pkg.price} onChange={(e) => onPackageChange(index, e)}  placeholder="Price" required/>
              {formErrors[`packagePrice${index}`] && <p className="form-error">{formErrors[`packagePrice${index}`]}</p>}
            </div>

            <div className='form-group'>
              <label className='form-label'>Currency</label>
              <input className="form-input" type="text" name="currency" value={pkg.currency} onChange={(e) => onPackageChange(index, e)} readOnly/>
            </div>

           
            {packages.length > 1 && (
              <button type="button" className='btn btn-remove-package' onClick={() => onRemovePackage(index)}> 
                Remove Package
              </button>
            )}
          </div>
        </div>
      ))}

      <button type="button" className='btn btn-add-package' onClick={onAddPackage}> 
        Add Package
      </button>
      {formErrors.packages && <p className="form-error">{formErrors.packages}</p>}
    </div>
  )
}

export default PackagesForm